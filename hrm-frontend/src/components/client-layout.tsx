"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { QueryProvider } from "@/providers/query-provider"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import LayoutClient from "@/components/layout-client"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryProvider>
        <LayoutClient>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
          </div>
        </LayoutClient>
      </QueryProvider>
    </QueryClientProvider>
  )
}
