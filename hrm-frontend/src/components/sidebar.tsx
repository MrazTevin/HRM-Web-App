"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Clients",
      href: "/clients",
      icon: Users,
    },
    {
      title: "Programs",
      href: "/programs",
      icon: ClipboardList,
    },
  ]

  const teamManagementItems = [
    {
      title: "Reports",
      href: "/reports",
      icon: BarChart,
    },
  ]

  const otherItems = [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Help & Center",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && <span className="text-primary font-bold text-xl">HealthCare</span>}
          {collapsed && <span className="text-primary font-bold text-xl">H</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? "ml-0" : ""}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-6 px-2">
          <div>
            <h3
              className={cn(
                "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                collapsed ? "text-center" : "px-3 mb-2",
              )}
            >
              {!collapsed ? "Main" : ""}
            </h3>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                    collapsed ? "justify-center" : "",
                  )}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-gray-600",
                    )}
                  />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3
              className={cn(
                "text-xs font-semibold text-gray-500 uppercase tracking-wider",
                collapsed ? "text-center" : "px-3 mb-2",
              )}
            >
              {!collapsed ? "Team Management" : ""}
            </h3>
            <div className="space-y-1">
              {teamManagementItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                    collapsed ? "justify-center" : "",
                  )}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-gray-600",
                    )}
                  />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="space-y-1">
              {otherItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100",
                    collapsed ? "justify-center" : "",
                  )}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 h-5 w-5",
                      pathname === item.href ? "text-white" : "text-gray-500 group-hover:text-gray-600",
                    )}
                  />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          className={cn(
            "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100",
            collapsed ? "justify-center" : "",
          )}
        >
          <LogOut className="flex-shrink-0 h-5 w-5 text-gray-500" />
          {!collapsed && <span className="ml-3">Log Out</span>}
        </button>
      </div>
    </div>
  )
}
