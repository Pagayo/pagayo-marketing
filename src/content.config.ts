// src/content.config.ts - Astro 6 Content Collections Schema
// Migrated from legacy src/content/config.ts for Astro 6 compatibility
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog Posts Collection
 * MDX files for blog articles
 */
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
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

export const collections = {
  blog: blogCollection,
};
