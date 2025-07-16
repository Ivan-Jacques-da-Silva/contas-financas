"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import GastosList from "@/components/gastos-list"
import ContasFixasList from "@/components/contas-fixas-list"
import AddGastoForm from "@/components/add-gasto-form"
import AddContaFixaForm from "@/components/add-conta-fixa-form"
import DashboardSummary from "@/components/dashboard-summary"
import GastosCharts from "@/components/gastos-charts"
import type { Gasto, ContaFixa } from "@/types"

export default function Home() {
  const [hideValues, setHideValues] = useState(false)
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [contasFixas, setContasFixas] = useState<ContaFixa[]>([])
  const [activeTab, setActiveTab] = useState("dashboard")

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedGastos = localStorage.getItem("gastos")
    const savedContasFixas = localStorage.getItem("contasFixas")

    if (savedGastos) {
      setGastos(JSON.parse(savedGastos))
    }

    if (savedContasFixas) {
      setContasFixas(JSON.parse(savedContasFixas))
    }
  }, [])

  // Salvar dados no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    localStorage.setItem("contasFixas", JSON.stringify(contasFixas))
  }, [contasFixas])

  const addGasto = (gasto: Gasto) => {
    setGastos([...gastos, gasto])
  }

  const addContaFixa = (contaFixa: ContaFixa) => {
    setContasFixas([...contasFixas, contaFixa])
  }

  const removeGasto = (id: string) => {
    setGastos(gastos.filter((gasto) => gasto.id !== id))
  }

  const removeContaFixa = (id: string) => {
    setContasFixas(contasFixas.filter((conta) => conta.id !== id))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Gestão Financeira Pessoal
          </h1>
          <Button
            variant="outline"
            onClick={() => setHideValues(!hideValues)}
            className="flex items-center gap-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900"
          >
            {hideValues ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {hideValues ? "Mostrar Valores" : "Ocultar Valores"}
          </Button>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="gastos">Gastos</TabsTrigger>
            <TabsTrigger value="contas-fixas">Contas Fixas</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardSummary gastos={gastos} contasFixas={contasFixas} hideValues={hideValues} />
            <GastosCharts gastos={gastos} hideValues={hideValues} />
          </TabsContent>

          <TabsContent value="gastos">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <AddGastoForm onAddGasto={addGasto} />
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <GastosList gastos={gastos} hideValues={hideValues} onRemoveGasto={removeGasto} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contas-fixas">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <AddContaFixaForm onAddContaFixa={addContaFixa} />
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-800 shadow-sm border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <ContasFixasList
                    contasFixas={contasFixas}
                    hideValues={hideValues}
                    onRemoveContaFixa={removeContaFixa}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
