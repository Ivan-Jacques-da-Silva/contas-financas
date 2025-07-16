"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { ContaFixa } from "@/types"

interface ContasFixasListProps {
  contasFixas: ContaFixa[]
  hideValues: boolean
  onRemoveContaFixa: (id: string) => void
}

export default function ContasFixasList({ contasFixas, hideValues, onRemoveContaFixa }: ContasFixasListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Contas Fixas Mensais</h2>
      {contasFixas.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-lg">
          <p>Nenhuma conta fixa cadastrada</p>
          <p className="text-sm mt-2">Adicione sua primeira conta fixa usando o formulário</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Valor Mensal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contasFixas.map((conta) => (
                <TableRow key={conta.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                  <TableCell className="font-medium">{conta.nome}</TableCell>
                  <TableCell>{hideValues ? "••••••" : formatCurrency(conta.valor)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveContaFixa(conta.id)}
                      className="text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
