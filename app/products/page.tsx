"use client"

import AppLayout from "../app-layout"
import { DataTable } from "@/app/products/_table/data-table"
import { columns } from "@/app/products/_table/columns"
import { CreateProductForm } from "@/app/products/_dialogs/create-product-form"

const MOCK_PRODUCTS = [
  {
    _id: "1",
    name: "Terminal Punto de Venta X1",
    sku: "HW-TPV-01",
    category: "Hardware",
    stock: 24,
    minStock: 5,
    baseCost: 450.0,
    profitMargin: 25,
    taxPercentage: 21,
  },
  {
    _id: "2",
    name: "Escáner Láser Pro",
    sku: "HW-SCAN-99",
    category: "Hardware",
    stock: 8,
    minStock: 15,
    baseCost: 120.0,
    profitMargin: 40,
    taxPercentage: 16,
  },
]

const EXCHANGE_RATE = 1050

export default function ProductsPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-480 space-y-6 font-sans">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Productos
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Gestión de costos, márgenes e impuestos.
            </p>
          </div>
          <CreateProductForm />
        </div>

        <DataTable columns={columns} data={MOCK_PRODUCTS} />
      </div>
    </AppLayout>
  )
}
