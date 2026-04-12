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

export const collections = {
  i18n,
};
