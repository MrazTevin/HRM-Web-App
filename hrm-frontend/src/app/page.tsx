import { FileText, Users, Activity, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/dashboard/start-card"
import { mockDashboardStats, mockClients } from "@/lib/mock-data"
import { formatNumber } from "../lib/utils"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">👋 Welcome Back, Ali Husni!</span>
          </h1>
          <p className="text-muted-foreground">
            Let&apos;s Rock today. We have {mockDashboardStats.pendingTasks} Pending Tasks and{" "}
            {mockDashboardStats.newRecords} New Records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>+ Add New</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Patient Record"
          value={formatNumber(mockDashboardStats.clientCount)}
          change={mockDashboardStats.clientChange}
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Programs"
          value={formatNumber(mockDashboardStats.programCount)}
          change={mockDashboardStats.programChange}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Compliance Rate"
          value={`${mockDashboardStats.complianceRate}%`}
          change={mockDashboardStats.complianceChange}
          icon={<Activity className="h-4 w-4" />}
        />
        {/* <StatCard
          title="Financial Flow"
          value={formatCurrency(mockDashboardStats.revenueTotal)}
          change={mockDashboardStats.revenueChange}
          icon={<DollarSign className="h-4 w-4" />}
        /> */}
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2">
        <LineChart title="Patient Arrival Statistics" />
        <BarChart title="Financial Flow" />
      </div> */}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search Patient..."
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
                <TableHead>Patient ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Primary Diagnosis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>{client.gender}</TableCell>
                  <TableCell>{client.admissionDate}</TableCell>
                  <TableCell>{client.department}</TableCell>
                  <TableCell>{client.diagnosis}</TableCell>
                  <TableCell>
                    <span className={`status-${client.status.toLowerCase()}`}>{client.status}</span>
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
