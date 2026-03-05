"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Upload,
  BookOpen,
  ShieldAlert,
  ClipboardList,
  Activity,
  Shield,
  ChevronDown,
  ChevronRight,
  Workflow,
  Fingerprint,
  Eye,
  ScanSearch,
  Clock4,
  UserCheck,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useApp } from "@/lib/app-context"

type Page = "dashboard" | "ingestion" | "parsing" | "ledger" | "quarantine" | "audit" | "health" | "settings"

const ingestionSubItems: { id: Page; label: string; icon: typeof Upload }[] = [
  { id: "ingestion", label: "Injection Control", icon: Upload },
  { id: "ledger", label: "Ledger View", icon: BookOpen },
  { id: "quarantine", label: "Quarantine Center", icon: ShieldAlert },
  { id: "audit", label: "Audit Trails", icon: ClipboardList },
  { id: "health", label: "System Health", icon: Activity },
]

const parsingSubItems: { id: Page; label: string; icon: typeof Upload }[] = [
  { id: "parsing", label: "Parsing Pipeline", icon: Workflow },
]

export function AppSidebar() {
  const { currentPage, setCurrentPage } = useApp()
  const [ingestionOpen, setIngestionOpen] = useState(
    ingestionSubItems.some((item) => item.id === currentPage)
  )
  const [parsingOpen, setParsingOpen] = useState(currentPage === "parsing")

  const isIngestionSection = ingestionSubItems.some((item) => item.id === currentPage)
  const isParsingSection = currentPage === "parsing"

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center border border-primary bg-primary/10">
            <Shield className="size-4 text-primary" />
          </div>
          <div className="flex flex-col gap-0 group-data-[collapsible=icon]:hidden">
            <span className="text-xs font-bold tracking-wider text-foreground uppercase">NFLIP</span>
            <span className="text-[9px] text-muted-foreground leading-tight">Forensic Intelligence</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard - top level */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={currentPage === "dashboard"}
                  onClick={() => setCurrentPage("dashboard")}
                  tooltip="Dashboard"
                  className={
                    currentPage === "dashboard"
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary rounded-none"
                      : "text-foreground hover:bg-muted"
                  }
                >
                  <LayoutDashboard className="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Ingestion Phase - collapsible parent */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setIngestionOpen(!ingestionOpen)
                    if (!isIngestionSection) {
                      setCurrentPage("ingestion")
                    }
                  }}
                  tooltip="Ingestion Phase"
                  className={
                    isIngestionSection
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary rounded-none"
                      : "text-foreground hover:bg-muted"
                  }
                >
                  <Shield className="size-4" />
                  <span className="flex-1">Ingestion Phase</span>
                  {ingestionOpen ? (
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sub-items */}
              {ingestionOpen &&
                ingestionSubItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={currentPage === item.id}
                      onClick={() => setCurrentPage(item.id)}
                      tooltip={item.label}
                      className={`pl-8 ${
                        currentPage === item.id
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="size-3.5" />
                      <span className="text-[13px]">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              {/* Parsing Phase - collapsible parent */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    setParsingOpen(!parsingOpen)
                    if (!isParsingSection) {
                      setCurrentPage("parsing")
                    }
                  }}
                  tooltip="Parsing Phase"
                  className={
                    isParsingSection
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary rounded-none"
                      : "text-foreground hover:bg-muted"
                  }
                >
                  <Workflow className="size-4" />
                  <span className="flex-1">Parsing Phase</span>
                  {parsingOpen ? (
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Parsing Sub-items */}
              {parsingOpen &&
                parsingSubItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={currentPage === item.id}
                      onClick={() => setCurrentPage(item.id)}
                      tooltip={item.label}
                      className={`pl-8 ${
                        currentPage === item.id
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="size-3.5" />
                      <span className="text-[13px]">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-4 py-3">
        <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
          <p className="text-[9px] font-medium tracking-wider text-muted-foreground uppercase">
            Classification
          </p>
          <p className="text-[10px] font-bold tracking-wider text-destructive uppercase">
            Restricted
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
