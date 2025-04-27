"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockClients, mockPrograms } from "@/lib/mock-data"
import type { Client } from "@/lib/mock-data"

export default function EnrollClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const foundClient = mockClients.find((c) => c.id === params.id)
    if (foundClient) {
      setClient(foundClient)
      setSelectedPrograms(foundClient.enrolledPrograms)
    }
  }, [params.id])

  const handleProgramToggle = (programName: string) => {
    setSelectedPrograms((prev) => {
      if (prev.includes(programName)) {
        return prev.filter((p) => p !== programName)
      } else {
        return [...prev, programName]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to the API
    console.log("Enrolling client in programs:", selectedPrograms)

    // Redirect to client profile page after submission
    router.push(`/clients/${params.id}`)
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading client information...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Enroll Client in Programs</h1>
        <p className="text-muted-foreground">
          Client: {client.name} (ID: {client.id})
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Available Programs</CardTitle>
            <CardDescription>Select the programs you want to enroll this client in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPrograms.map((program) => (
                <div
                  key={program.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPrograms.includes(program.name)
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleProgramToggle(program.name)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedPrograms.includes(program.name)}
                      onChange={() => {}}
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Department:</span> {program.department}
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span> {program.duration}
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span> {program.status}
                    </div>
                    <div>
                      <span className="text-gray-500">Capacity:</span> {program.currentEnrollment}/{program.maxCapacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Enrollments</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
