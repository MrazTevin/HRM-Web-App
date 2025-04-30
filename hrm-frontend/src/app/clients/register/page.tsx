"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loading } from "@/components/ui/loading"
import { clientsApi } from "@/lib/api"
import type { ClientCreateRequest } from "@/types/client"

// Validation function
const validateClientData = (data: ClientCreateRequest) => {
  const errors: string[] = []

  // Required fields validation
  if (!data.first_name.trim()) errors.push("First name is required")
  if (!data.last_name.trim()) errors.push("Last name is required")
  if (!data.dob) errors.push("Date of birth is required")
  if (!data.gender) errors.push("Gender is required")
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.metadata.email)) {
    errors.push("Please enter a valid email address")
  }

  // Contact number validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!phoneRegex.test(data.metadata.contact)) {
    errors.push("Please enter a valid contact number")
  }

  // Department validation
  if (!data.metadata.department) {
    errors.push("Department is required")
  }

  // Diagnosis validation
  if (!data.metadata.diagnosis) {
    errors.push("Diagnosis is required")
  }

  return errors
}

export default function RegisterClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "male", // Changed to lowercase to match API
    contact_info: "", // Moved to root level
    metadata: {
      admission_date: new Date().toISOString().split('T')[0],
      department: "",
      diagnosis: "",
      status: "OUTPATIENT" as const, // Explicitly typed
      contact: "",
      email: "",
      address: "",
      insurance_provider: "",
      insurance_number: "",
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name.includes('metadata.')) {
      const metadataField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [metadataField]: value
        }
      }))
    } else if (name === 'gender') {
      // Convert gender to lowercase
      setFormData(prev => ({ ...prev, [name]: value.toLowerCase() }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format the data according to the API requirements
    const clientData: ClientCreateRequest = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      dob: formData.dob,
      gender: formData.gender.toLowerCase(), // Ensure lowercase
      contact_info: formData.metadata.contact, // Use contact from metadata
      metadata: {
        admission_date: formData.metadata.admission_date,
        department: formData.metadata.department,
        diagnosis: formData.metadata.diagnosis,
        status: formData.metadata.status as "INPATIENT" | "OUTPATIENT",
        contact: formData.metadata.contact,
        email: formData.metadata.email.toLowerCase().trim(),
        address: formData.metadata.address.trim(),
        insurance_provider: formData.metadata.insurance_provider || undefined,
        insurance_number: formData.metadata.insurance_number || undefined
      }
    }

    // Log the exact request payload for debugging
    // console.log('Request payload:', JSON.stringify(clientData, null, 2))

    // Validate the data
    const validationErrors = validateClientData(clientData)
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error))
      return
    }

    setIsLoading(true)

    try {
      await clientsApi.create(clientData)
      toast.success("Client registered successfully!")
      router.push("/clients")
    } catch (error: any) {
      // Handle specific API error cases
      if (error.response?.status === 409) {
        toast.error("A client with this email already exists")
      } else if (error.response?.status === 422) {
        const errorMessage = error.response?.data?.message || "Please check all required fields"
        toast.error(errorMessage)
        console.error("Validation error details:", error.response?.data)
      } else if (error.response?.status === 413) {
        toast.error("The submitted data is too large")
      } else if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network")
      } else {
        toast.error("Failed to register client. Please try again")
        console.error("Error response:", error.response?.data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading text="Registering client..." />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Register New Client</h1>
        <p className="text-muted-foreground">Add a new client to the system</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Enter the client&apos;s personal and medical information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
                <Input 
                  id="first_name" 
                  name="first_name" 
                  value={formData.first_name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
                <Input 
                  id="last_name" 
                  name="last_name" 
                  value={formData.last_name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
                <Input 
                  id="dob" 
                  name="dob" 
                  type="date" 
                  value={formData.dob} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="metadata.contact" className="text-sm font-medium">Contact Number</label>
                <Input 
                  id="metadata.contact" 
                  name="metadata.contact" 
                  value={formData.metadata.contact} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="metadata.email" className="text-sm font-medium">Email</label>
                <Input 
                  id="metadata.email" 
                  name="metadata.email" 
                  type="email" 
                  value={formData.metadata.email} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="metadata.address" className="text-sm font-medium">Address</label>
                <Input 
                  id="metadata.address" 
                  name="metadata.address" 
                  value={formData.metadata.address} 
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-4">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="metadata.department" className="text-sm font-medium">Department</label>
                  <select
                    id="metadata.department"
                    name="metadata.department"
                    value={formData.metadata.department}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Obstetrics">Obstetrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="metadata.status" className="text-sm font-medium">Patient Status</label>
                  <select
                    id="metadata.status"
                    name="metadata.status"
                    value={formData.metadata.status}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="OUTPATIENT">Outpatient</option>
                    <option value="INPATIENT">Inpatient</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="metadata.diagnosis" className="text-sm font-medium">Primary Diagnosis</label>
                  <Input 
                    id="metadata.diagnosis" 
                    name="metadata.diagnosis" 
                    value={formData.metadata.diagnosis} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="metadata.insurance_provider" className="text-sm font-medium">Insurance Provider</label>
                  <Input
                    id="metadata.insurance_provider"
                    name="metadata.insurance_provider"
                    value={formData.metadata.insurance_provider}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="metadata.insurance_number" className="text-sm font-medium">Insurance Number</label>
                  <Input
                    id="metadata.insurance_number"
                    name="metadata.insurance_number"
                    value={formData.metadata.insurance_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register Client"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
