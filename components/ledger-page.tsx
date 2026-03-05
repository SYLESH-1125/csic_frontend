"use client"

import { useState } from "react"
import { CheckCircle2, Download, Link2, ShieldCheck, XCircle, Loader2 } from "lucide-react"
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

const ledgerEntries = [
  {
    block: 1247,
    filename: "evidence_packet_0291.tar.gz",
    sha256: "a7f3b2c1d4e8...e9d4",
    previousHash: "d9a7c4b1e3f2...b8c5",
    merkleRoot: "0x8f2a9c1d...b3c1",
    uploadTime: "2026-03-03 14:23:17",
    sourceIp: "10.120.45.67",
    mode: "Manual",
    size: "2.4 GB",
    status: "committed",
  },
  {
    block: 1246,
    filename: "server_dump_node12.log",
    sha256: "c4e2d1a9f7b3...f7b3",
    previousHash: "b1f8e3d2a6c9...a6c9",
    merkleRoot: "0x3d7e4a2f...a2f4",
    uploadTime: "2026-03-03 14:18:42",
    sourceIp: "10.120.45.12",
    mode: "Cloud",
    size: "847 MB",
    status: "committed",
  },
  {
    block: 1245,
    filename: "audit_trail_q4.json",
    sha256: "d9a7c4b1e3f2...e2f8",
    previousHash: "e3c1d8a7b4f6...b4f6",
    merkleRoot: "0x5b8a7c2d...c7d3",
    uploadTime: "2026-03-03 14:05:33",
    sourceIp: "10.120.45.67",
    mode: "Manual",
    size: "156 MB",
    status: "committed",
  },
  {
    block: 1244,
    filename: "memory_dump_proc_4421.raw",
    sha256: "b1f8e3d2a6c9...a3b7",
    previousHash: "f2a7c1d8e3b4...e3b4",
    merkleRoot: "0x2c9f1a3d...d5e8",
    uploadTime: "2026-03-03 13:42:11",
    sourceIp: "10.120.45.23",
    mode: "Agentless",
    size: "4.1 GB",
    status: "committed",
  },
  {
    block: 1243,
    filename: "dns_exfil_capture.pcap",
    sha256: "e3c1d8a7b4f6...c8d2",
    previousHash: "a1b2c3d4e5f6...e5f6",
    merkleRoot: "0x7a2d9e1f...e1f9",
    uploadTime: "2026-03-03 13:28:55",
    sourceIp: "10.120.45.34",
    mode: "Cloud",
    size: "512 MB",
    status: "committed",
  },
]

export function LedgerPage() {
  const [chainValid, setChainValid] = useState<boolean | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyChain = () => {
    setIsVerifying(true)
    setChainValid(null)
    setTimeout(() => {
      setChainValid(true)
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Link2 className="size-4 text-primary" />
            Forensic Evidence Ledger
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Blockchain-style immutable log chain with cryptographic verification
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={verifyChain}
            disabled={isVerifying}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 size-4" />
                Verify Chain
              </>
            )}
          </Button>
          <Button variant="outline" className="border-border text-foreground">
            <Download className="mr-2 size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Integrity Indicator */}
      {chainValid !== null && (
        <Card className={`border ${chainValid ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
          <CardContent className="flex items-center gap-3 p-4">
            {chainValid ? (
              <>
                <CheckCircle2 className="size-5 text-success" />
                <div>
                  <p className="text-sm font-semibold text-success">Chain Integrity Verified</p>
                  <p className="text-[10px] text-success/80">
                    All {ledgerEntries.length} blocks validated. No tampering detected. Verified at {new Date().toISOString()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="size-5 text-destructive" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Chain Integrity Compromised</p>
                  <p className="text-[10px] text-destructive/80">Hash mismatch detected. Immediate investigation required.</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Ledger Table */}
      <Card className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Block</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Filename</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">SHA-256</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Previous Hash</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Merkle Root</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Mode</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Size</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Upload Time</TableHead>
              <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ledgerEntries.map((entry, i) => (
              <TableRow key={entry.block}>
                <TableCell className="font-mono text-xs font-bold text-primary">#{entry.block}</TableCell>
                <TableCell className="text-xs font-medium text-foreground">{entry.filename}</TableCell>
                <TableCell className="font-mono text-[10px] text-muted-foreground">{entry.sha256}</TableCell>
                <TableCell className="font-mono text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {i < ledgerEntries.length - 1 && <Link2 className="size-3 text-primary" />}
                    {entry.previousHash}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[10px] text-muted-foreground">{entry.merkleRoot}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] text-foreground border-border">{entry.mode}</Badge>
                </TableCell>
                <TableCell className="text-xs text-foreground">{entry.size}</TableCell>
                <TableCell className="font-mono text-[10px] text-muted-foreground">{entry.uploadTime}</TableCell>
                <TableCell>
                  <Badge className="bg-success/10 text-success border border-success/20 hover:bg-success/10 text-[10px]">
                    {entry.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
