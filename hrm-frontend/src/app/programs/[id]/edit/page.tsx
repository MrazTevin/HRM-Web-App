"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { programsApi } from "@/lib/api"
import type { Program, ProgramUpdateRequest } from "@/types/program"

type ProgramStatus = "ACTIVE" | "UPCOMING" | "COMPLETED"

export default function EditProgramPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [program, setProgram] = useState<Program | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    metadata: {
      cost: "",
      duration: "",
      department: "",
      status: "" as ProgramStatus
    }
  })

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await programsApi.getById(params.id)
        const programData = response.data
        setProgram(programData)
        setFormData({
          name: programData.name,
          description: programData.description,
          metadata: {
            cost: programData.metadata.cost.toString(),
            duration: programData.metadata.duration.toString(),
            department: programData.metadata.department,
            status: programData.metadata.status
          }
        })
      } catch (error) {
        toast.error("Failed to load program")
        router.push("/programs")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProgram()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!program) return

    setIsSaving(true)

    try {
      const updateData: ProgramUpdateRequest = {
        name: formData.name,
        description: formData.description,
        metadata: {
          cost: parseFloat(formData.metadata.cost),
          duration: parseInt(formData.metadata.duration),
          department: formData.metadata.department,
          status: formData.metadata.status,
          max_capacity: program.metadata.max_capacity,
          current_enrollment: program.metadata.current_enrollment
        }
      }

      await programsApi.update(params.id, updateData)
      toast.success("Program updated successfully")
      router.push(`/programs/${params.id}`)
    } catch (error) {
      toast.error("Failed to update program")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Program</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Program Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label htmlFor="name" className="text-sm font-medium">Program Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  required 
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="cost" className="text-sm font-medium">Cost</label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  value={formData.metadata.cost}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metadata: {
                      ...prev.metadata,
                      cost: e.target.value
                    }
                  }))}
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.metadata.status}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    metadata: {
                      ...prev.metadata,
                      status: e.target.value as ProgramStatus
                    }
                  }))}
                  className="flex h-10 w-full rounded-md border"
                  required
                >
                  <option value="ACTIVE">Active</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
