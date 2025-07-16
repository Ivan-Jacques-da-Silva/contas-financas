"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Gasto, TipoGasto } from "@/types"

interface GastosListProps {
  gastos: Gasto[]
  hideValues: boolean
  onRemoveGasto: (id: string) => void
}

export default function GastosList({ gastos, hideValues, onRemoveGasto }: GastosListProps) {
  const getBadgeVariant = (tipo: TipoGasto) => {
    switch (tipo) {
      case "Cartão de Crédito":
        return "destructive"
      case "Débito":
        return "default"
      case "Pix":
        return "secondary"
      case "Boleto":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Seus Gastos</h2>
      {gastos.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-lg">
          <p>Nenhum gasto cadastrado</p>
          <p className="text-sm mt-2">Adicione seu primeiro gasto usando o formulário</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900">
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Parcelas</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gastos.map((gasto) => (
                <TableRow key={gasto.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                  <TableCell className="font-medium">{gasto.descricao}</TableCell>
                  <TableCell>{hideValues ? "••••••" : formatCurrency(gasto.valor)}</TableCell>
                  <TableCell>{new Date(gasto.dataVencimento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(gasto.tipo)} className="font-normal">
                      {gasto.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {gasto.parcelas > 1 ? `${gasto.parcelaAtual || 1}/${gasto.parcelas}` : "À vista"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveGasto(gasto.id)}
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
