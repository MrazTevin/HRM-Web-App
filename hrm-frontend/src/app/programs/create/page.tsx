"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { programsApi } from "@/lib/api"
import type { ProgramCreateRequest } from "@/types/program"

export default function CreateProgramPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    department: "",
    maxCapacity: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
    cost: "",
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.department) {
      toast.error("Please fill in all required fields")
      return false
    }

    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    
    if (endDate <= startDate) {
      toast.error("End date must be after start date")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const programData: ProgramCreateRequest = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        metadata: {
          duration: parseInt(formData.duration),
          department: formData.department,
          max_capacity: parseInt(formData.maxCapacity),
          current_enrollment: 0,
          start_date: new Date(formData.startDate).toISOString().split('T')[0],
          end_date: new Date(formData.endDate).toISOString().split('T')[0],
          status: formData.status as "ACTIVE" | "UPCOMING" | "COMPLETED",
          cost: parseFloat(formData.cost)
        }
      }

      // console.log('Sending data:', programData) // For debugging
      const response = await programsApi.create(programData)
      toast.success(response.message || "Program created successfully")
      router.push("/programs")
    } catch (error: any) {
      // console.error('Error details:', error.response?.data) // For debugging
      toast.error(error.response?.data?.message || "Failed to create program. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Program</h1>
        <p className="text-muted-foreground">Add a new health program to the system</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Program Information</CardTitle>
            <CardDescription>Enter the details for the new health program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Program Name
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
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
                  <option value="Nutrition">Nutrition</option>
                  <option value="Physical Therapy">Physical Therapy</option>
                  <option value="Pain Clinic">Pain Clinic</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Pharmacy">Pharmacy</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duration
                </label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="maxCapacity" className="text-sm font-medium">
                  Maximum Capacity
                </label>
                <Input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="ACTIVE">Active</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="cost" className="text-sm font-medium">
                  Program Cost (KES)
                </label>
                <Input id="cost" name="cost" type="number" value={formData.cost} onChange={handleChange} required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Program"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
