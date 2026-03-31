import { Doc } from "./_generated/dataModel"

/**
 * Calcula el precio neto (Precio Base + Margen)
 * basándose en la estructura real de tu tabla de productos.
 */
export const calculateNetPrice = (product: Doc<"products">): number => {
  const { baseCost, profitMargin } = product

  // Evitamos división por cero si el margen es 100% (caso extremo)
  if (profitMargin >= 100) return baseCost

  return baseCost / (1 - profitMargin / 100)
}

/**
 * Calcula el monto del impuesto para un subtotal dado.
 */
export const calculateTaxAmount = (
  subtotal: number,
  taxPercentage: number
): number => {
  return subtotal * (taxPercentage / 100)
}

/**
 * Estructura de respuesta para un cálculo completo de venta.
 * Esto ayuda a que el iPad sepa exactamente qué campos esperar.
 */
export interface SaleCalculation {
  subtotal: number
  taxAmount: number
  total: number
}

export const getFullPriceBreakdown = (
  product: Doc<"products">,
  taxRate: Doc<"taxRates">,
  exchangeRate: number
): SaleCalculation => {
  const netPriceUSD = calculateNetPrice(product)
  const subtotalLocal = netPriceUSD * exchangeRate
  const taxAmount = calculateTaxAmount(subtotalLocal, taxRate.percentage)

  return {
    subtotal: subtotalLocal,
    taxAmount: taxAmount,
    total: subtotalLocal + taxAmount,
  }
}

/**
 * Formatea un número a una cadena de moneda localizable.
 * * @param value - El monto numérico a formatear.
 * @param currency - Código de moneda (ISO 4217), ej: 'USD', 'ARS', 'EUR'.
 * @returns String formateado, ej: "$ 1.250,00"
 */
export function formatCurrency(
  value: number | undefined | null,
  currency: string = "USD"
): string {
  if (value === undefined || value === null) return "-"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("VES", "Bs.")
}
