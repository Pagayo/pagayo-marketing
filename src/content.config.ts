import { defineCollection, z } from "astro:content";

const i18n = defineCollection({
  type: "data",
  schema: z.object({
    nav: z.object({
      features: z.string(),
      gyms: z.string(),
      pricing: z.string(),
      impact: z.string(),
      partners: z.string(),
      login: z.string(),
      start: z.string(),
    }),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["Engineering", "Product", "Industry"]),
    author: z.object({
      name: z.string(),
      role: z.string(),
    }),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  i18n,
  blog,
};
