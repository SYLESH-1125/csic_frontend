"use client"

import { Activity, Wifi, Database, Cpu, HardDrive, ShieldCheck, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const healthChecks = [
  {
    label: "WebSocket Sessions Active",
    value: "12 / 50",
    status: "healthy",
    icon: Wifi,
    detail: "24% capacity utilized",
  },
  {
    label: "Redis Ready",
    value: "Connected",
    status: "healthy",
    icon: Database,
    detail: "Latency: 0.3ms | Memory: 2.1 GB / 8 GB",
  },
  {
    label: "Sandbox Worker Running",
    value: "3 / 3 Active",
    status: "healthy",
    icon: Cpu,
    detail: "Queue depth: 2 | Avg processing: 4.2s",
  },
  {
    label: "Disk Storage Usage",
    value: "4.7 TB / 10 TB",
    status: "healthy",
    icon: HardDrive,
    detail: "47% utilized | WORM partition healthy",
    progress: 47,
  },
  {
    label: "Integrity Verification Status",
    value: "All Chains Valid",
    status: "healthy",
    icon: ShieldCheck,
    detail: "Last full verification: 2026-03-03 14:05:33 UTC",
  },
]

const systemMetrics = [
  { label: "Uptime", value: "47d 12h 33m" },
  { label: "Last Restart", value: "2026-01-15 02:00:00 UTC" },
  { label: "API Response Avg", value: "23ms" },
  { label: "Active Connections", value: "18" },
  { label: "SSL Certificate", value: "Valid (expires 2027-01-15)" },
  { label: "Backup Status", value: "Last: 2026-03-03 06:00:00 UTC" },
]

export function HealthPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Activity className="size-4 text-primary" />
          System Health Monitor
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Real-time infrastructure and service health status
        </p>
      </div>

      {/* Health Checks */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {healthChecks.map((check) => (
          <Card key={check.label} className="border border-border bg-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center bg-muted">
                  <check.icon className="size-5 text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                      {check.label}
                    </p>
                    {check.status === "healthy" ? (
                      <CheckCircle2 className="size-4 text-success" />
                    ) : (
                      <XCircle className="size-4 text-destructive" />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{check.value}</p>
                  <p className="text-[10px] text-muted-foreground">{check.detail}</p>
                  {check.progress !== undefined && (
                    <div className="flex flex-col gap-1">
                      <Progress value={check.progress} className="h-1.5" />
                      <span className="text-[9px] text-muted-foreground">{check.progress}% utilized</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Metrics */}
      <Card className="border border-border bg-card">
        <CardHeader className="border-b border-border p-4">
          <CardTitle className="text-sm font-semibold text-foreground">
            System Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {systemMetrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  {metric.label}
                </p>
                <p className="text-sm font-semibold text-foreground">{metric.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
