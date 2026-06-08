import { z } from 'zod';

export const changelogItemSchema = z.object({
  type: z.enum(['new', 'improved', 'fixed', 'removed']),
  text: z.string().min(1),
  area: z.string().optional(),
});

export const changelogReleaseSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  items: z.array(changelogItemSchema).min(1),
});

export const changelogSchema = z.object({
  meta: z.object({
    projectStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    generatedAt: z.string(),
    entryCount: z.number().int().nonnegative(),
    releaseCount: z.number().int().nonnegative().optional(),
  }),
  releases: z.array(changelogReleaseSchema).min(1),
});

export type ChangelogData = z.infer<typeof changelogSchema>;
export type ChangelogItem = z.infer<typeof changelogItemSchema>;
export type ChangelogRelease = z.infer<typeof changelogReleaseSchema>;

export function parseChangelog(data: unknown): ChangelogData {
  return changelogSchema.parse(data);
}
