"use client"

import { ClipboardList, User, Shield, FileText, LogIn, LogOut, Search as SearchIcon, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const auditEntries = [
  {
    id: "AUD-92847",
    timestamp: "2026-03-03 14:23:17 UTC",
    officer: "Dir. Rajesh Kumar",
    action: "FILE_INGESTED",
    target: "evidence_packet_0291.tar.gz",
    ip: "10.120.45.67",
    level: "info",
  },
  {
    id: "AUD-92846",
    timestamp: "2026-03-03 14:18:42 UTC",
    officer: "Analyst Priya Sharma",
    action: "FILE_INGESTED",
    target: "server_dump_node12.log",
    ip: "10.120.45.12",
    level: "info",
  },
  {
    id: "AUD-92845",
    timestamp: "2026-03-03 14:12:05 UTC",
    officer: "System",
    action: "FILE_QUARANTINED",
    target: "network_capture_seg7.pcap",
    ip: "10.120.45.89",
    level: "warning",
  },
  {
    id: "AUD-92844",
    timestamp: "2026-03-03 14:05:33 UTC",
    officer: "Dir. Rajesh Kumar",
    action: "LEDGER_VERIFIED",
    target: "Full chain (blocks 1-1247)",
    ip: "10.120.45.67",
    level: "info",
  },
  {
    id: "AUD-92843",
    timestamp: "2026-03-03 13:58:21 UTC",
    officer: "System",
    action: "MALWARE_DETECTED",
    target: "malware_sample_x92.bin",
    ip: "10.120.45.12",
    level: "critical",
  },
  {
    id: "AUD-92842",
    timestamp: "2026-03-03 13:42:11 UTC",
    officer: "Analyst Vikram Patel",
    action: "SESSION_START",
    target: "Authentication successful",
    ip: "10.120.45.23",
    level: "info",
  },
  {
    id: "AUD-92841",
    timestamp: "2026-03-03 13:28:55 UTC",
    officer: "Analyst Priya Sharma",
    action: "FILE_INGESTED",
    target: "dns_exfil_capture.pcap",
    ip: "10.120.45.34",
    level: "info",
  },
  {
    id: "AUD-92840",
    timestamp: "2026-03-03 12:45:33 UTC",
    officer: "System",
    action: "HEADER_MISMATCH",
    target: "document_leaked_v3.pdf",
    ip: "10.120.45.67",
    level: "warning",
  },
]

const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  FILE_INGESTED: FileText,
  FILE_QUARANTINED: Shield,
  LEDGER_VERIFIED: ClipboardList,
  MALWARE_DETECTED: Shield,
  SESSION_START: LogIn,
  SESSION_END: LogOut,
  HEADER_MISMATCH: Eye,
}

const levelColors: Record<string, string> = {
  info: "bg-primary/10 text-primary border-primary/20",
  warning: "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
}

export function AuditPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <ClipboardList className="size-4 text-primary" />
          Audit Trail
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Complete forensic audit log of all system operations
        </p>
      </div>

      <Card className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">ID</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Timestamp</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Officer</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Action</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Target</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Source IP</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditEntries.map((entry) => {
              const ActionIcon = actionIcons[entry.action] || FileText
              return (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{entry.id}</TableCell>
                  <TableCell className="font-mono text-[10px] text-muted-foreground">{entry.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <User className="size-3 text-muted-foreground" />
                      <span className="text-xs text-foreground">{entry.officer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <ActionIcon className="size-3 text-primary" />
                      <span className="font-mono text-[10px] font-medium text-foreground">{entry.action}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-48 text-xs text-muted-foreground">{entry.target}</TableCell>
                  <TableCell className="font-mono text-[10px] text-muted-foreground">{entry.ip}</TableCell>
                  <TableCell>
                    <Badge className={`border ${levelColors[entry.level]} hover:${levelColors[entry.level]} text-[10px]`}>
                      {entry.level.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
