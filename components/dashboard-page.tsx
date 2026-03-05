"use client"

import { FileText, Shield, ShieldAlert, Link2, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const metrics = [
  {
    label: "Total Logs Ingested",
    value: "1,247,832",
    icon: FileText,
    trend: "+2,341 today",
    color: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    label: "Active Secure Sessions",
    value: "12",
    icon: Shield,
    trend: "All authenticated",
    color: "text-success",
    borderColor: "border-success/30",
  },
  {
    label: "Quarantined Files",
    value: "47",
    icon: ShieldAlert,
    trend: "3 pending review",
    color: "text-destructive",
    borderColor: "border-destructive/30",
  },
  {
    label: "Ledger Integrity Status",
    value: "Chain Valid",
    icon: Link2,
    trend: "Last verified: 2 min ago",
    color: "text-success",
    borderColor: "border-success/30",
    isValid: true,
  },
]

const lineData = [
  { date: "Jan", logs: 142000 },
  { date: "Feb", logs: 168000 },
  { date: "Mar", logs: 191000 },
  { date: "Apr", logs: 175000 },
  { date: "May", logs: 210000 },
  { date: "Jun", logs: 198000 },
  { date: "Jul", logs: 245000 },
  { date: "Aug", logs: 267000 },
  { date: "Sep", logs: 289000 },
  { date: "Oct", logs: 312000 },
  { date: "Nov", logs: 334000 },
  { date: "Dec", logs: 356000 },
]

const barData = [
  { mode: "Manual", count: 482 },
  { mode: "Cloud", count: 327 },
  { mode: "Agentless", count: 198 },
]

const pieData = [
  { name: "Clean", value: 1200785, fill: "#198754" },
  { name: "Quarantined", value: 47047, fill: "#DC2626" },
]

const recentLogs = [
  {
    fileName: "evidence_packet_0291.tar.gz",
    sha256: "a7f3b2c1...e9d4",
    merkleRoot: "0x8f2a...b3c1",
    mode: "Manual",
    size: "2.4 GB",
    status: "Clean",
    uploadTime: "2026-03-03 14:23:17 UTC",
  },
  {
    fileName: "server_dump_node12.log",
    sha256: "c4e2d1a9...f7b3",
    merkleRoot: "0x3d7e...a2f4",
    mode: "Cloud",
    size: "847 MB",
    status: "Clean",
    uploadTime: "2026-03-03 14:18:42 UTC",
  },
  {
    fileName: "network_capture_seg7.pcap",
    sha256: "b1f8e3d2...a6c9",
    merkleRoot: "0x9c1f...d5e2",
    mode: "Agentless",
    size: "1.2 GB",
    status: "Quarantine",
    uploadTime: "2026-03-03 14:12:05 UTC",
  },
  {
    fileName: "audit_trail_q4.json",
    sha256: "d9a7c4b1...e2f8",
    merkleRoot: "0x5b8a...c7d3",
    mode: "Manual",
    size: "156 MB",
    status: "Clean",
    uploadTime: "2026-03-03 14:05:33 UTC",
  },
  {
    fileName: "malware_sample_x92.bin",
    sha256: "e3c1d8a7...b4f6",
    merkleRoot: "0x7a2d...e1f9",
    mode: "Cloud",
    size: "34 MB",
    status: "Quarantine",
    uploadTime: "2026-03-03 13:58:21 UTC",
  },
]

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Section 1: Overview Metrics */}
      <section>
        <h3 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Overview Metrics
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card
              key={metric.label}
              className={`border-l-2 ${metric.borderColor} bg-card`}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className={`flex size-10 shrink-0 items-center justify-center bg-muted ${metric.color}`}>
                  <metric.icon className="size-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                    {metric.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">
                      {metric.value}
                    </span>
                    {metric.isValid && (
                      <CheckCircle2 className="size-4 text-success" />
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {metric.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2: Analytics Graphs */}
      <section>
        <h3 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Analytics
        </h3>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* Line Chart */}
          <Card className="border border-border bg-card xl:col-span-2">
            <CardHeader className="border-b border-border p-4">
              <CardTitle className="text-sm font-semibold text-foreground">
                Logs Ingested Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748B" }} />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#64748B" }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        border: "1px solid #D1D5DB",
                        borderRadius: "2px",
                        fontSize: "12px",
                      }}
                      formatter={(v: number) => [v.toLocaleString(), "Logs"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="logs"
                      stroke="#0B5ED7"
                      strokeWidth={2}
                      dot={{ fill: "#0B5ED7", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar + Pie vertical stack */}
          <div className="flex flex-col gap-4">
            <Card className="border border-border bg-card">
              <CardHeader className="border-b border-border p-4">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Ingestion Mode Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} />
                      <YAxis dataKey="mode" type="category" tick={{ fontSize: 11, fill: "#64748B" }} width={70} />
                      <Tooltip
                        contentStyle={{
                          background: "#fff",
                          border: "1px solid #D1D5DB",
                          borderRadius: "2px",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="count" fill="#0B5ED7" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardHeader className="border-b border-border p-4">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Clean vs Quarantined
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-4">
                <div className="h-[120px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#fff",
                          border: "1px solid #D1D5DB",
                          borderRadius: "2px",
                          fontSize: "12px",
                        }}
                        formatter={(v: number) => [v.toLocaleString(), "Files"]}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "11px" }}
                        iconType="square"
                        iconSize={8}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: Recent Logs Table */}
      <section>
        <h3 className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Recent Logs
        </h3>
        <Card className="border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">File Name</TableHead>
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">SHA-256</TableHead>
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Merkle Root</TableHead>
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Mode</TableHead>
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Size</TableHead>
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Status</TableHead>
                <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Upload Time (UTC)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLogs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-medium text-foreground">{log.fileName}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.sha256}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.merkleRoot}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-medium text-foreground border-border">
                      {log.mode}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-foreground">{log.size}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        log.status === "Clean"
                          ? "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                          : "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10"
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.uploadTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  )
}
