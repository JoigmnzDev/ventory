"use client"

import { useState } from "react"
import {
  ShoppingCart,
  Trash,
  Plus,
  Minus,
  Barcode,
  CreditCard,
  Pause,
  Play,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface CartItem {
  id: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
  category: "camisas" | "pantalones" | "accesorios"
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      sku: "CAM-AZU-L",
      name: "Camisa Azul L",
      quantity: 1,
      unitPrice: 461.5,
      category: "camisas",
    },
    {
      id: "2",
      sku: "PAN-VAQ-42",
      name: "Pantalón Vaquero 42",
      quantity: 1,
      unitPrice: 461.5,
      category: "pantalones",
    },
    {
      id: "3",
      sku: "PAN-VAQ-42",
      name: "Pantalón Vaquero 42",
      quantity: 2,
      unitPrice: 461.5,
      category: "pantalones",
    },
  ])

  const [searchSku, setSearchSku] = useState("")
  const [paused, setPaused] = useState(false)
  const [exchangeRate] = useState(35.5)

  const total = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const totalUsd = total / exchangeRate

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity + change),
            }
          : item
      )
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "camisas":
        return "👕"
      case "pantalones":
        return "👖"
      case "accesorios":
        return "🎒"
      default:
        return "📦"
    }
  }

  return (
    <div className="flex h-screen flex-col gap-4 bg-gradient-to-br from-slate-100 to-slate-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 p-2 text-white">
            <ShoppingCart size={24} weight="duotone" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              MiNegocio Retail - Terminal de Venta
            </h1>
            <p className="text-sm text-slate-500">Sucursal Centro</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-slate-700 font-semibold">
            JP
          </div>
          <div className="text-sm">
            <p className="font-medium text-slate-900">Juan P.</p>
            <p className="text-xs text-slate-500">T1</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left Column - Cart/Transactions */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Cart Table */}
          <Card className="flex-1 overflow-hidden rounded-xl border-0 shadow-sm">
            <div className="flex flex-col h-full">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200 px-4 py-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-600">
                  <div className="col-span-2">SKU</div>
                  <div className="col-span-3">Producto</div>
                  <div className="col-span-2 text-center">Cant.</div>
                  <div className="col-span-2 text-right">P. Unit.</div>
                  <div className="col-span-2 text-right">Total</div>
                  <div className="col-span-1"></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-y-auto">
                {cart.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="border-b border-slate-100 px-4 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-2">
                        <code className="text-xs font-mono text-slate-700">
                          {item.sku}
                        </code>
                      </div>
                      <div className="col-span-3 flex items-center gap-2">
                        <span className="text-lg">{getCategoryIcon(item.category)}</span>
                        <span className="text-sm text-slate-900 font-medium">
                          {item.name}
                        </span>
                      </div>

                      {/* Quantity Control */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            <Minus size={16} weight="bold" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            <Plus size={16} weight="bold" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-right text-sm text-slate-700 font-medium">
                        {item.unitPrice.toFixed(2)}
                      </div>
                      <div className="col-span-2 text-right text-sm font-bold text-slate-900">
                        {(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-6 w-6 items-center justify-center rounded text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Search */}
          <div className="flex gap-2 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex flex-1 items-center gap-2 rounded-lg border-2 border-slate-200 px-3 focus-within:border-blue-400 transition-colors">
              <Barcode size={20} className="text-slate-400" weight="duotone" />
              <Input
                type="text"
                placeholder="Escanear SKU o Nombre"
                value={searchSku}
                onChange={(e) => setSearchSku(e.target.value)}
                className="border-0 p-0 focus-visible:ring-0"
              />
            </div>
            <Button
              variant="outline"
              className="px-6 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Right Column - Payment Panel */}
        <div className="flex w-96 flex-col gap-4">
          {/* Total Summary */}
          <Card className="rounded-xl border-0 shadow-sm bg-gradient-to-br from-white to-slate-50 p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">Total (Local)</p>
            <div className="mb-6">
              <div className="text-5xl font-bold text-slate-900">
                {total.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Bs. Local</p>
            </div>

            {/* Currency Info */}
            <div className="rounded-lg bg-blue-50 p-3 mb-6 border border-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">💱</span>
                <div className="text-xs">
                  <p className="font-semibold text-blue-900">
                    Tasa Cambio: 1 USD = {exchangeRate.toFixed(2)} LOCAL
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-sm border-t border-slate-200 pt-4 mb-6">
              <div className="flex justify-between text-slate-700">
                <span>Impuestos:</span>
                <span className="font-medium text-slate-900">{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Descuento:</span>
                <span className="font-medium text-slate-900">0.00</span>
              </div>
            </div>
          </Card>

          {/* Payment Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-semibold text-base shadow-md hover:shadow-lg hover:from-emerald-500 hover:to-emerald-600 transition-all"
            >
              💵 Pagar Local
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-2 border-blue-300 text-blue-600 font-semibold text-base bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              🔄 Pagar USD ({totalUsd.toFixed(2)})
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-base bg-white hover:bg-slate-50 transition-colors"
            >
              💳 Pagar Tarjeta
            </Button>
          </div>

          {/* Footer Controls */}
          <div className="flex gap-2">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <>
                  <Play size={18} weight="bold" />
                  Reanudar
                </>
              ) : (
                <>
                  <Pause size={18} weight="bold" />
                  Pausar
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1 rounded-xl border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              ← Atrás
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
