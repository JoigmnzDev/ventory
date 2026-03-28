import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const create = mutation({
  args: {
    name: v.string(),
    icon: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthenticated: Please log in to manage categories.")
    }

    const orgId = identity.orgId as string
    if (!orgId) {
      throw new Error("Forbidden: An active organization is required.")
    }

    const existing = await ctx.db
      .query("categories")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .unique()

    if (existing) {
      throw new Error(`Conflict: Category "${args.name}" already exists.`)
    }

    return await ctx.db.insert("categories", {
      orgId,
      name: args.name,
      icon: args.icon ?? "package",
    })
  },
})
