import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import '@/app/globals.css'
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import LayoutClient from "@/components/layout-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthCare HRM",
  description: "Health Relationship Management System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
          </div>
        </LayoutClient>
      </body>
    </html>
  )
}
