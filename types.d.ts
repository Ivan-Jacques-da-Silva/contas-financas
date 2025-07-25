import type React from "react"
export type TipoGasto = "Cartão de Crédito" | "Débito" | "Pix" | "Boleto"

export interface Gasto {
  id: string
  descricao: string
  valor: number
  dataVencimento: string
  tipo: TipoGasto
  parcelas: number
  parcelaAtual?: number
  data?: string // Data de criação para gráficos de evolução
}

export interface ContaFixa {
  id: string
  nome: string
  valor: number
}

export interface SummaryData {
  title: string
  value: number
  description: string
  icon: React.ReactNode
}
