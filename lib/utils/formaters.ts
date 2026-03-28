import { Doc } from "@/convex/_generated/dataModel"

/**
 * Transforma un producto de la base de datos en un objeto listo
 * para mostrar en la interfaz (UI) con precios calculados.
 */
export function formatProductForDisplay(
  product: Doc<"products">,
  org: Doc<"organizations">
) {
  const { baseCost, profitMargin } = product
  const { exchangeRate, baseCurrency, saleCurrency } = org

  const price = baseCost / (1 - profitMargin / 100)
  const priceLocal = price * exchangeRate

  return {
    ...product,
    displayBase: `${baseCurrency} ${baseCost.toFixed(2)}`,
    displaySale: `${saleCurrency} ${priceLocal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    profitAmount: price - baseCost,
  }
}
