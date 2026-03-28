import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    categoryId: v.id("categories"),
    taxRateId: v.id("taxRates"),
    sku: v.string(),
    barcode: v.optional(v.string()),
    name: v.string(),
    baseCost: v.number(),
    profitMargin: v.number(),
    stock: v.number(),
    minStock: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthenticated: Please log in to continue.")
    }

    const orgId = identity.orgId as string
    if (!orgId) {
      throw new Error(
        "Forbidden: You must be part of an organization to create products."
      )
    }

    const existing = await ctx.db
      .query("products")
      .withIndex("by_org_sku", (q) => q.eq("orgId", orgId).eq("sku", args.sku))
      .unique()

    if (existing) {
      throw new Error(
        `Conflict: SKU "${args.sku}" already exists in this organization.`
      )
    }

    return await ctx.db.insert("products", { ...args, orgId })
  },
})
