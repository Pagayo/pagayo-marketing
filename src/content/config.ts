import { z } from "zod";

export const pricingTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  monthly: z.number(),
  annual: z.number(),
  annualLabel: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  cta: z.string(),
  variant: z.enum(["primary", "secondary"]),
  popular: z.boolean().optional(),
});

export const pricingSchema = z.object({
  tiers: z.array(pricingTierSchema),
});

export const featuresSchema = z.object({
  items: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export const competitorsSchema = z.object({
  rows: z.array(
    z.object({
      platform: z.string(),
      price: z.string(),
      perMemberFees: z.string(),
      note: z.string(),
      highlight: z.boolean().optional(),
    }),
  ),
  featureChecklist: z.array(z.string()),
});

export const channelsSchema = z.object({
  items: z.array(
    z.object({
      icon: z.string(),
      label: z.string(),
    }),
  ),
});

export const trustSchema = z.object({
  logobar: z.array(z.string()),
  security: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});
