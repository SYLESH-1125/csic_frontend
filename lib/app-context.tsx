"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type Page = "login" | "dashboard" | "ingestion" | "parsing" | "ledger" | "quarantine" | "audit" | "health" | "settings"

interface AppContextType {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  officerName: string
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useCallback(() => {
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentPage("login")
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isAuthenticated,
        login,
        logout,
        officerName: "Dir. Rajesh Kumar, IPS",
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
