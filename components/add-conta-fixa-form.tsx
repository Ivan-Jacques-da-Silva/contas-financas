"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { ContaFixa } from "@/types"

const formSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  valor: z.coerce.number().positive({ message: "Valor deve ser positivo" }),
})

interface AddContaFixaFormProps {
  onAddContaFixa: (contaFixa: ContaFixa) => void
}

export default function AddContaFixaForm({ onAddContaFixa }: AddContaFixaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      valor: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddContaFixa({
      id: crypto.randomUUID(),
      ...values,
    })
    form.reset({
      nome: "",
      valor: 0,
    })
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Adicionar Conta Fixa</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Aluguel" {...field} className="border-slate-200 dark:border-slate-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Mensal (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} className="border-slate-200 dark:border-slate-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
            Adicionar Conta Fixa
          </Button>
        </form>
      </Form>
    </div>
  )
}
