"use client"

import { SetStateAction, useState } from "react"
import { Bell, Search} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search here..."
            className="w-full pl-9 h-9"
            value={searchQuery}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* <span className="text-xs text-gray-500 ml-2 hidden md:inline">K/B</span> */}
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center">
          <div className="flex -space-x-2 mr-4">
            <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
