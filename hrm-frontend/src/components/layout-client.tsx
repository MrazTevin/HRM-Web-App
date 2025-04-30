import type React from "react"
import { Toaster } from "sonner"

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Toaster richColors position="top-right" />
      {children}
    </>
  )
}