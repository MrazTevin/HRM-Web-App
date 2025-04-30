import axios, { AxiosError } from "axios"
import axiosRetry from "axios-retry"
import { toast } from "sonner"
import { Program } from "@/types/program"
import { Client, ClientCreateRequest } from "@/types/client"
import { ApiResponse, ApiError, Enrollment, DashboardStats } from "@/types/api"

const API_BASE_URL = "https://hrm-web-app-gha1.onrender.com"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
})

// Configure retry logic
axiosRetry(api, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    return retryCount * 1000 // time interval between retries (1s, 2s, 3s)
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           (error.response?.status ? error.response?.status >= 500 : false)
  },
  onRetry: (retryCount) => {
    toast(`Retrying Request - Attempt ${retryCount} of 3`)
  },
})

// Enhanced error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const errorCode = error.response?.status
    const errorMessage = error.response?.data?.message || "An error occurred"
    
    let toastMessage = errorMessage
    
    // Handle specific error cases
    switch(errorCode) {
      case 401:
        toastMessage = "Please log in to continue"
        break
      case 403:
        toastMessage = "You don't have permission to perform this action"
        break
      case 404:
        toastMessage = "The requested resource was not found"
        break
      case 429:
        toastMessage = "Please wait before trying again"
        break
    }

    toast.error(toastMessage)
    return Promise.reject(error)
  }
)

// Programs API
export const programsApi = {
  // Get all programs
  getAll: async (): Promise<ApiResponse<Program[]>> => {
    const response = await api.get("/api/programs")
    return response.data
  },

  // Get program by ID
  getById: async (id: string): Promise<ApiResponse<Program>> => {
    const response = await api.get(`/api/programs/${id}`)
    return response.data
  },

  // Create new program
  create: async (programData: Program): Promise<ApiResponse<Program>> => {
    const response = await api.post("/api/programs", programData)
    return response.data
  },

  // Update program
  update: async (id: string, programData: Program): Promise<ApiResponse<Program>> => {
    const response = await api.patch(`/api/programs/${id}`, programData)
    return response.data
  },

  // Delete program
  delete: async (id: string): Promise<ApiResponse<Program>> => {
    const response = await api.delete(`/api/programs/${id}`)
    return response.data
  },
}

// Clients API
export const clientsApi = {
  // Get all clients
  getAll: async (search?: string): Promise<ApiResponse<Client[]>> => {
    const params = search ? { search } : {}
    const response = await api.get("/api/clients", { params })
    return response.data
  },

  // Get client by ID
  getById: async (id: string): Promise<ApiResponse<Client>> => {
    const response = await api.get(`/api/clients/${id}`)
    return response.data
  },

  // Get client public profile
  getPublicProfile: async (id: string): Promise<ApiResponse<Client>> => {
    const response = await api.get(`/api/public/clients/${id}/profile`)
    return response.data
  },

  // Create new client
  create: async (clientData: ClientCreateRequest): Promise<ApiResponse<Client>> => {
    const response = await api.post("/api/clients", clientData)
    const responseData = response.data
    // console.log('Raw API Response:', responseData)
    return responseData
  },

  // Update client
  update: async (id: string, clientData: Client): Promise<ApiResponse<Client>> => {
    const response = await api.patch(`/api/clients/${id}`, clientData)
    return response.data
  },

  // Delete client
  delete: async (id: string): Promise<ApiResponse<Client>> => {
    const response = await api.delete(`/api/clients/${id}`)
    return response.data
  },
}

// Enrollments API
export const enrollmentsApi = {
  // Enroll client in programs
  enroll: async (clientId: string, programIds: string[]): Promise<ApiResponse<Enrollment>> => {
    const response = await api.post("/api/enrollments", {
      client_id: clientId,
      program_ids: programIds,
    })
    return response.data
  },
}

// Dashboard API (for stats)
export const dashboardApi = {
  // Get dashboard stats
  getStats: async (): Promise<DashboardStats> => {
    // This would be a real endpoint in a production app
    // For now, we'll calculate stats from clients and programs
    const clientsResponse = await clientsApi.getAll()
    const programsResponse = await programsApi.getAll()

    const clients = clientsResponse.data || []
    const programs = programsResponse.data || []

    // Calculate stats
    return {
      clientCount: clients.length,
    //   clientChange: "+12% increase on last month", // This should come from the API
      programCount: programs.length,
    //   programChange: "+2 new programs", // This would come from the API
    //   complianceRate: 98, // This would come from the API
    //   complianceChange: "+5.5% increase on last month", // This would come from the API
    //   revenueTotal: programs.reduce((sum: number, program: any) => sum + (program.metadata?.cost || 0), 0),
    //   revenueChange: "+20% increase on last month", // This would come from the API
      costTotal: programs.reduce((sum: number, program: any) => sum + (program.metadata?.cost || 0) * 0.6, 0), // Assuming costs are 60% of revenue
    //   pendingTasks: 2, // This would come from the API
      newRecords: clients.filter((client: any) => {
        const createdAt = new Date(client.created_at)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - createdAt.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
      }).length,
    }
  },
}

export default api
