// src/content/config.ts - Astro Content Collections Schema
import { defineCollection, z } from 'astro:content';

/**
 * Landing Pages Collection
 * YAML files per country (nl.yaml, de.yaml, gb.yaml, etc.)
 */
const pagesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Meta information
    meta: z.object({
      slug: z.string(),
      language: z.string(),
      region: z.string(),
      country: z.string(),
      locale: z.string(),
      currency: z.string(),
    }),

    // SEO settings
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string().optional(),
      noindex: z.boolean().optional(),
    }),

    // Hero section
    hero: z.object({
      badge: z.string().optional(),
      headline: z.string(),
      headlineAccent: z.string(),
      subtitle: z.string(),
      primaryCta: z.object({
        text: z.string(),
        url: z.string(),
      }),
      secondaryCta: z
        .object({
          text: z.string(),
          url: z.string(),
        })
        .optional(),
      stats: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          })
        )
        .optional(),
    }),

    // Features section
    features: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
          link: z.string().optional(),
          badge: z.string().optional(),
        })
      ),
    }),

    // Pricing section
    pricing: z.object({
      title: z.string(),
      subtitle: z.string(),
      badge: z.string().optional(),
      tiers: z.array(
        z.object({
          percentage: z.string(),
          range: z.string(),
        })
      ),
      features: z.array(z.string()),
      cta: z.object({
        text: z.string(),
        url: z.string(),
      }),
    }),

    // CTA section
    cta: z.object({
      title: z.string(),
      subtitle: z.string(),
      primaryCta: z.object({
        text: z.string(),
        url: z.string(),
      }),
    }),

    // Navigation
    nav: z.record(z.string()),

    // Footer
    footer: z.object({
      sections: z.array(
        z.object({
          title: z.string(),
          links: z.array(
            z.object({
              label: z.string(),
              path: z.string(),
            })
          ),
        })
      ),
    }),
  }),
});

/**
 * Blog Posts Collection
 * MDX files for blog articles
 */
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Pagayo Team'),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

/**
 * Integrations Collection
 * Info about payment providers, platforms, etc.
 */
const integrationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    logo: z.string(),
    category: z.enum(['payments', 'shipping', 'platforms', 'analytics']),
    featured: z.boolean().optional(),
    features: z.array(z.string()),
  }),
});

/**
 * Case Studies Collection
 */
const casesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    customer: z.string(),
    industry: z.string(),
    region: z.string(),
    headline: z.string(),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
    story: z.object({
      challenge: z.string(),
      solution: z.string(),
      results: z.string(),
    }),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
        avatar: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  blog: blogCollection,
  integrations: integrationsCollection,
  cases: casesCollection,
};
