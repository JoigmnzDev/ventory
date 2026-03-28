import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    name: v.string(),
    percentage: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthenticated: Please log in to manage tax rates.")
    }

    const orgId = identity.orgId as string
    if (!orgId) {
      throw new Error("Forbidden: Organization context is missing.")
    }

    if (args.percentage < 0 || args.percentage > 100) {
      throw new Error("Invalid Argument: Percentage must be between 0 and 100.")
    }

    const existing = await ctx.db
      .query("taxRates")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .unique()

    if (existing) {
      throw new Error(`Conflict: Tax rate "${args.name}" is already defined.`)
    }

    return await ctx.db.insert("taxRates", {
      orgId,
      name: args.name,
      percentage: args.percentage,
    })
  },
})
