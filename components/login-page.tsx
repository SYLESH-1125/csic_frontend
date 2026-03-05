"use client"

import { useState } from "react"
import { Shield, Lock, FileText, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useApp } from "@/lib/app-context"

export function LoginPage() {
  const { login } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login()
    }, 1200)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(11,94,215,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(11,94,215,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 px-4">
        {/* Government Emblem */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-16 items-center justify-center border-2 border-primary bg-primary/5">
            <Shield className="size-8 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Government of India
            </p>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
              Ministry of Electricity & IT
            </p>
          </div>
        </div>

        <Card className="w-full border border-border shadow-sm">
          <CardHeader className="gap-1 border-b border-border pb-4 text-center">
            <h1 className="text-lg font-semibold text-foreground">
              Secure Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Forensic Intelligence Portal
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Official Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="officer@gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border-border bg-background text-foreground"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 border-border bg-background pr-10 text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="otp" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  2FA Code (OTP)
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="h-10 border-border bg-background font-mono tracking-[0.3em] text-foreground"
                />
              </div>

              <Button
                type="submit"
                className="mt-2 h-10 w-full bg-primary font-medium text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Authenticating...
                  </span>
                ) : (
                  "Authenticate & Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Indicators */}
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <SecurityIndicator icon={Lock} label="AES-256 Encrypted Session" />
          <SecurityIndicator icon={Shield} label="JIT Auth Protected" />
          <SecurityIndicator icon={FileText} label="Audit Logged Access" />
        </div>

        <p className="text-[10px] text-muted-foreground">
          Unauthorized access is a punishable offense under IT Act, 2000
        </p>
      </div>
    </div>
  )
}

function SecurityIndicator({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>, label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="size-3 text-success" />
      <span className="text-[10px] font-medium text-success">{label}</span>
    </div>
  )
}
