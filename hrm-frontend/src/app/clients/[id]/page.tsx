"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockClients, mockPrograms } from "@/lib/mock-data"
import type { Client } from "@/lib/mock-data"

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundClient = mockClients.find((c) => c.id === params.id)
    if (foundClient) {
      setClient(foundClient)
    }
  }, [params.id])

  if (!client) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading client information...</p>
      </div>
    )
  }

  // Get enrolled programs
  const enrolledPrograms = mockPrograms.filter((program) => client.enrolledPrograms.includes(program.name))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">Client ID: {client.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => router.push(`/clients/enroll/${client.id}`)}>Enroll in Program</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-2 text-sm">
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Age:</dt>
                <dd className="col-span-2">{client.age}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Gender:</dt>
                <dd className="col-span-2">{client.gender}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Contact:</dt>
                <dd className="col-span-2">{client.contact}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Email:</dt>
                <dd className="col-span-2">{client.email}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Address:</dt>
                <dd className="col-span-2">{client.address}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-2 text-sm">
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Admission Date:</dt>
                <dd className="col-span-2">{client.admissionDate}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Department:</dt>
                <dd className="col-span-2">{client.department}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Diagnosis:</dt>
                <dd className="col-span-2">{client.diagnosis}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Status:</dt>
                <dd className="col-span-2">
                  <span className={`status-${client.status.toLowerCase()}`}>{client.status}</span>
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Insurance:</dt>
                <dd className="col-span-2">{client.insuranceProvider || "N/A"}</dd>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <dt className="font-medium text-gray-500">Insurance #:</dt>
                <dd className="col-span-2">{client.insuranceNumber || "N/A"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Programs</CardTitle>
          <CardDescription>Programs the client is currently enrolled in</CardDescription>
        </CardHeader>
        <CardContent>
          {enrolledPrograms.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrolledPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">{program.id}</TableCell>
                    <TableCell>{program.name}</TableCell>
                    <TableCell>{program.department}</TableCell>
                    <TableCell>{program.duration}</TableCell>
                    <TableCell>
                      <span className={`status-${program.status.toLowerCase()}`}>{program.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">This client is not enrolled in any programs yet.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => router.push(`/clients/enroll/${client.id}`)}>
            Manage Enrollments
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
