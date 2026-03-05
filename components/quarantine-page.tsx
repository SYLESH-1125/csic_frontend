"use client"

import { ShieldAlert, Search, AlertTriangle, Bug, FileWarning, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const quarantinedFiles = [
  {
    id: "QRN-0047",
    fileName: "network_capture_seg7.pcap",
    sha256: "b1f8e3d2...a6c9",
    reason: "Zip Bomb",
    detail: "Compression ratio 142:1 exceeds threshold",
    timestamp: "2026-03-03 14:12:05 UTC",
    severity: "critical",
    sourceIp: "10.120.45.89",
  },
  {
    id: "QRN-0046",
    fileName: "malware_sample_x92.bin",
    sha256: "e3c1d8a7...b4f6",
    reason: "Malware",
    detail: "YARA rule match: Trojan.GenericKD.47291",
    timestamp: "2026-03-03 13:58:21 UTC",
    severity: "critical",
    sourceIp: "10.120.45.12",
  },
  {
    id: "QRN-0045",
    fileName: "document_leaked_v3.pdf",
    sha256: "f7a2b1c8...d3e9",
    reason: "Header Mismatch",
    detail: "Magic bytes indicate executable, extension is .pdf",
    timestamp: "2026-03-03 12:45:33 UTC",
    severity: "warning",
    sourceIp: "10.120.45.67",
  },
  {
    id: "QRN-0044",
    fileName: "archive_obfuscated.zip",
    sha256: "a9c7d2e1...f8b3",
    reason: "Zip Bomb",
    detail: "Nested compression detected (depth: 7)",
    timestamp: "2026-03-03 11:22:17 UTC",
    severity: "critical",
    sourceIp: "10.120.45.45",
  },
  {
    id: "QRN-0043",
    fileName: "payload_encoded.dat",
    sha256: "c2e8f1a7...b9d4",
    reason: "Malware",
    detail: "Entropy score 0.97, high obfuscation detected",
    timestamp: "2026-03-03 10:15:42 UTC",
    severity: "critical",
    sourceIp: "10.120.45.23",
  },
]

const reasonIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Zip Bomb": AlertTriangle,
  "Malware": Bug,
  "Header Mismatch": FileWarning,
}

export function QuarantinePage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <ShieldAlert className="size-4 text-destructive" />
          Quarantine Center
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Isolated suspicious files pending forensic review
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-l-2 border-l-destructive bg-card">
          <CardContent className="p-4">
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Total Quarantined
            </p>
            <p className="text-2xl font-bold text-destructive">{quarantinedFiles.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-destructive bg-card">
          <CardContent className="p-4">
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Critical Severity
            </p>
            <p className="text-2xl font-bold text-destructive">
              {quarantinedFiles.filter((f) => f.severity === "critical").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-[#D97706] bg-card">
          <CardContent className="p-4">
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Warnings
            </p>
            <p className="text-2xl font-bold text-[#D97706]">
              {quarantinedFiles.filter((f) => f.severity === "warning").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border border-destructive/20 bg-card">
        <CardHeader className="border-b border-destructive/10 bg-destructive/5 p-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <ShieldAlert className="size-4" />
            Suspicious Files
          </CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">ID</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">File Name</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">SHA-256</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Reason</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Detail</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Timestamp</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quarantinedFiles.map((file) => {
              const ReasonIcon = reasonIcons[file.reason] || AlertTriangle
              return (
                <TableRow key={file.id}>
                  <TableCell className="font-mono text-xs font-bold text-destructive">{file.id}</TableCell>
                  <TableCell className="text-xs font-medium text-foreground">{file.fileName}</TableCell>
                  <TableCell className="font-mono text-[10px] text-muted-foreground">{file.sha256}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <ReasonIcon className="size-3.5 text-destructive" />
                      <Badge className={
                        file.severity === "critical"
                          ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10 text-[10px]"
                          : "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20 hover:bg-[#D97706]/10 text-[10px]"
                      }>
                        {file.reason}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-48 text-[10px] text-muted-foreground">{file.detail}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="size-3 text-muted-foreground" />
                      <span className="font-mono text-[10px] text-muted-foreground">{file.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 border-destructive/30 text-[10px] text-destructive hover:bg-destructive/5"
                    >
                      <Search className="size-3" />
                      Investigate
                    </Button>
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
