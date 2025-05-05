"use client"

import { useQuery } from "@tanstack/react-query"
import { clientsApi } from "@/lib/api"
import { Loading } from "@/components/ui/loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Client } from "@/types/client"
import type { ApiResponse } from "@/types/api"

interface ClientDetailProps {
  params: {
    id: string
  }
}

export default function ClientDetailPage({ params }: ClientDetailProps) {
  const { data: client, isLoading, error } = useQuery<ApiResponse<Client>, Error, Client>({
    queryKey: ['client', params.id],
    queryFn: () => clientsApi.getById(params.id),
    select: (response) => response.data,
  })

  if (isLoading) {
    return <Loading text="Loading client details..." />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load client details</AlertDescription>
      </Alert>
    )
  }

  if (!client) {
    return (
      <Alert>
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>Client not found</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p>{`${client.first_name} ${client.last_name}`}</p>
              </div>
              <div>
                <h3 className="font-medium">Gender</h3>
                <p>{client.gender}</p>
              </div>
              <div>
                <h3 className="font-medium">Contact</h3>
                <p>{client.contact_info}</p>
              </div>
              <div>
                <h3 className="font-medium">Department</h3>
                <p>{client.metadata.department}</p>
              </div>
              <div>
                <h3 className="font-medium">Status</h3>
                <p className={`status-${client.metadata.status.toLowerCase()}`}>
                  {client.metadata.status}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
