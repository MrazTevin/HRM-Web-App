export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  // status: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, any>
}

export interface Enrollment {
  client_id: string
  program_ids: string[]
}

export interface EnrollmentResponse {
  attached: string[]
  detached: string[]
  updated: string[]
}
export interface DashboardStats {
  clientCount: number
  programCount: number
  costTotal: number
  newRecords: number
}