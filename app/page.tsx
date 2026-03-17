"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { LoginPage } from "@/components/login-page"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { DashboardPage } from "@/components/dashboard-page"
import { IngestionPage } from "@/components/ingestion-page"
import { LedgerPage } from "@/components/ledger-page"
import { QuarantinePage } from "@/components/quarantine-page"
import { AuditPage } from "@/components/audit-page"
import { HealthPage } from "@/components/health-page"
import { SettingsPage } from "@/components/settings-page"
import { ParsingPage } from "@/components/parsing-page"
import { MagicQueryPage } from "@/components/magic-query-page"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

function AppContent() {
  const { isAuthenticated, currentPage } = useApp()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
        <ScrollArea className="flex-1">
          <main>
            {currentPage === "dashboard" && <DashboardPage />}
            {currentPage === "ingestion" && <IngestionPage />}
            {currentPage === "parsing" && <ParsingPage />}
            {currentPage === "magic-query" && <MagicQueryPage />}
            {currentPage === "ledger" && <LedgerPage />}
            {currentPage === "quarantine" && <QuarantinePage />}
            {currentPage === "audit" && <AuditPage />}
            {currentPage === "health" && <HealthPage />}
            {currentPage === "settings" && <SettingsPage />}
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
