import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/convex/utils"
import { ColumnDef } from "@tanstack/react-table"
import { HiEllipsisVertical } from "react-icons/hi2"

const EXCHANGE_RATE = 1050

export type Product = {
  _id: string
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  baseCost: number
  profitMargin: number
  taxPercentage: number
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Producto",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] font-black tracking-tighter text-blue-500 uppercase">
            {product.category}
          </span>
          <span className="text-[14px] leading-tight font-bold text-slate-800">
            {product.name}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            #{product.sku}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
      </Button>
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number
      const minStock = row.original.minStock
      return (
        <div
          className={`inline-flex flex-col items-center rounded-lg px-3 py-1 ${stock <= minStock ? "bg-amber-50 text-amber-700" : "text-slate-600"}`}
        >
          <span className="text-base font-bold">{stock}</span>
          <span className="text-[10px] font-medium uppercase opacity-70">
            Unds
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "baseCost",
    header: "Costo",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-slate-500">
        <span className="text-sm font-medium tracking-tight">
          {formatCurrency(row.getValue("baseCost") as number)}
        </span>
      </div>
    ),
  },
  {
    id: "margin",
    header: "Margen",
    cell: ({ row }) => {
      const cost = row.original.baseCost
      const margin = row.original.profitMargin
      const neto = cost * (1 + margin / 100)
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 font-bold text-emerald-600">
            <span className="text-xs">+{margin}%</span>
          </div>
          <span className="text-xs font-black text-emerald-800">
            {formatCurrency(neto)}
          </span>
        </div>
      )
    },
  },
  {
    id: "tax",
    header: "IVA",
    cell: ({ row }) => {
      const cost = row.original.baseCost
      const margin = row.original.profitMargin
      const tax = row.original.taxPercentage
      const taxAmount = cost * (1 + margin / 100) * (tax / 100)
      return (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1 text-xs font-black text-amber-600 uppercase">
            +{tax}%
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {formatCurrency(taxAmount)}
          </span>
        </div>
      )
    },
  },
  {
    id: "pvp",
    header: "PVP (USD)",
    cell: ({ row }) => {
      const product = row.original
      const neto = product.baseCost * (1 + product.profitMargin / 100)
      const total = neto * (1 + product.taxPercentage / 100)
      return (
        <div className="text-sm font-black tracking-tight text-blue-900">
          {formatCurrency(total)}
        </div>
      )
    },
  },
  {
    id: "local",
    header: "Precio Local",
    cell: ({ row }) => {
      const product = row.original
      const neto = product.baseCost * (1 + product.profitMargin / 100)
      const totalUsd = neto * (1 + product.taxPercentage / 100)
      const local = totalUsd * EXCHANGE_RATE
      return (
        <div className="flex flex-col gap-1 leading-none">
          <span className="text-sm font-black text-slate-800">
            {formatCurrency(local)}
          </span>
          <span className="w-fit rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">
            TASA {EXCHANGE_RATE}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-slate-400 hover:text-slate-600"
          >
            <HiEllipsisVertical className="size-4" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-[10px] text-slate-400 uppercase">
            Opciones
          </DropdownMenuLabel>
          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
          <DropdownMenuItem>Editar precios</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
