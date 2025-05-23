"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { programsApi } from "@/lib/api"
import type { Program } from "@/types/program"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"

export default function ProgramsPage() {
  const router = useRouter()
  
  const { data: programsResponse, isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: () => programsApi.getAll(),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  })

  const programs = programsResponse?.data || []

  // Helper function to format ID
  const formatId = (id: string) => {
    // Extract last 4 characters of UUID and convert to number
    const shortId = parseInt(id.replace(/-/g, '').slice(-4), 16)
    return `#${shortId}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Programs</h1>
          <p className="text-muted-foreground">Manage and view all health programs</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/programs/create">
            <Button>+ Create Program</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Program List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search programs..."
                className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-2">
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
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-primary"></div>
                      <span>Loading programs...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{formatId(program.id)}</TableCell>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>{program.metadata.department}</TableCell>
                  <TableCell>{program.metadata.duration}</TableCell>
                  <TableCell>
                    {program.metadata.current_enrollment}/{program.metadata.max_capacity}
                  </TableCell>
                  <TableCell>{formatCurrency(program.metadata.cost)}</TableCell>
                  <TableCell>
                    <span className={`status-${program.metadata.status.toLowerCase()}`}>
                      {program.metadata.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => router.push(`/programs/${program.id}`)}>
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => router.push(`/programs/${program.id}/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
