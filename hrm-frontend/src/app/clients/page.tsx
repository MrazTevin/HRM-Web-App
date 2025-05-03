"use client"

import type React from "react"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { Toaster, toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loading } from "@/components/ui/loading"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { clientsApi } from "@/lib/api"
import type { Client } from "@/types/client"

interface ClientResponse {
  data: Client[]
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const queryClient = useQueryClient()

  const {
    data: clients = [],
    isLoading,
    error,
  } = useQuery<ClientResponse, Error, Client[]>({
    queryKey: ['clients', { search: searchQuery }],
    queryFn: async () => {
      const response = await clientsApi.getAll(searchQuery)
      return response
    },
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData, 
  })

  const handleSearch = () => {
    queryClient.invalidateQueries({
      queryKey: ['clients', { search: searchQuery }],
    })
  }

  const handleDeleteClient = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await clientsApi.delete(id)
        toast.success("Client deleted successfully")
        queryClient.invalidateQueries({
          queryKey: ['clients'],
          refetchType: 'all',
        })
      } catch (err) {
        console.error("Error deleting client:", err)
        toast.error("Failed to delete client")
      }
    }
  }

  if (isLoading) {
    return <Loading text="Loading clients..." />
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load clients. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">Manage and view all client information</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/clients/register">
              <Button>+ Register New Client</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Client List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <button className="absolute inset-y-0 right-0 flex items-center px-2" onClick={handleSearch}>
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span className="ml-2">Filter</span>
                </Button>
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <span className="ml-2">Export</span>
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id.substring(0, 6)}</TableCell>
                      <TableCell>{`${client.first_name} ${client.last_name}`}</TableCell>
                      <TableCell>{client.gender}</TableCell>
                      <TableCell>{client.contact_info}</TableCell>
                      <TableCell>{client.metadata.department}</TableCell>
                      <TableCell>
                        <span className={`status-${client.metadata.status.toLowerCase()}`}>{client.metadata.status}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link href={`/clients/${client.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                          <Link href={`/clients/enroll/${client.id}`}>
                            <Button variant="outline" size="sm">
                              Enroll
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No clients found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}


