// src/content/config.ts - Astro Content Collections Schema
// Simplified for JSON-based content structure
import { defineCollection, z } from 'astro:content';

/**
 * Blog Posts Collection
 * MDX files for blog articles
 */
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    author: z.string().default('Pagayo Team'),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const pagesCollection = defineCollection({
  type: 'data',
  schema: z.record(z.unknown()),
});

const settingsCollection = defineCollection({
  type: 'data',
  schema: z.record(z.unknown()),
});

const variantsCollection = defineCollection({
  type: 'data',
  schema: z.record(z.unknown()),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
  settings: settingsCollection,
  variants: variantsCollection,
};
