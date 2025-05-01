"use client"

import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { programsApi } from "@/lib/api"
import type { Program } from "@/types/program"
import { formatCurrency } from "@/lib/utils"

export default function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const { data: programResponse, isLoading } = useQuery({
    queryKey: ['program', id],
    queryFn: () => programsApi.getById(id),
    staleTime: 1000 * 60 * 5,
  })

  const program = programResponse?.data

  const formatId = (id: string) => {
    const shortId = parseInt(id.replace(/-/g, '').slice(-4), 16)
    return `#${shortId}`
  }

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this program?")) return

    setIsDeleting(true)
    try {
      await programsApi.delete(id)
      toast.success("Program deleted successfully")
      router.push("/programs")
    } catch (error) {
      toast.error("Failed to delete program")
      setIsDeleting(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!program) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{program.name}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/programs/${id}/edit`)}>
            Edit Program
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Program"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Description</h3>
              <p>{program.description}</p>
            </div>
            <div>
              <h3 className="font-medium">Department</h3>
              <p>{program.metadata.department}</p>
            </div>
            <div>
              <h3 className="font-medium">Duration</h3>
              <p>{program.metadata.duration}</p>
            </div>
            <div>
              <h3 className="font-medium">Enrollment</h3>
              <p>{program.metadata.current_enrollment} / {program.metadata.max_capacity}</p>
            </div>
            <div>
              <h3 className="font-medium">Cost</h3>
              <p>{formatCurrency(program.metadata.cost)}</p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <p>{program.metadata.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
