import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  organizations: defineTable({
    orgId: v.string(),
    baseCurrency: v.string(),
    saleCurrency: v.string(),
    exchangeRate: v.number(),
    autoUpdateExhange: v.boolean(),
    defaultTaxRateId: v.optional(v.id("taxRates")),
  }).index("by_org", ["orgId"]),

  taxRates: defineTable({
    orgId: v.string(),
    name: v.string(),
    percentage: v.number(),
  }).index("by_org", ["orgId"]),

  categories: defineTable({
    orgId: v.string(),
    name: v.string(),
    icon: v.optional(v.string()),
  }).index("by_org", ["orgId"]),

  products: defineTable({
    orgId: v.string(),
    categoryId: v.id("categories"),
    taxRateId: v.id("taxRates"),
    sku: v.string(),
    barcode: v.optional(v.string()),
    name: v.string(),
    baseCost: v.number(),
    profitMargin: v.number(),
    stock: v.number(),
    minStock: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_org_sku", ["orgId", "sku"])
    .index("by_org_barcode", ["orgId", "barcode"])
    .index("by_org_category", ["orgId", "categoryId"]),

  sales: defineTable({
    orgId: v.string(),
    totalAmount: v.number(),
    totalTax: v.number(),
    exchangeRateAtSale: v.number(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
      })
    ),
  }).index("by_org", ["orgId"]),
})
