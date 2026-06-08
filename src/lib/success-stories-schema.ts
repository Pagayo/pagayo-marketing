import { z } from 'zod';

export const storyVerticalSchema = z.enum([
  'gym',
  'crossfit',
  'yoga',
  'martial-arts',
  'football-club',
  'tennis-club',
  'swimming-club',
  'community-pool',
  'community-foundation',
  'cultural-association',
  'fashion-webshop',
  'electronics-webshop',
  'bookshop',
  'home-goods',
  'pet-supplies',
  'artisan-marketplace',
  'b2b-catalog',
  'subscription-box',
  'cafe',
  'restaurant',
  'food-truck',
  'charity-shop',
  'event-tickets',
  'hotel-gift-shop',
  'local-retailer',
]);

export const successStorySchema = z.object({
  quote: z.string().min(20),
  role: z.string().min(5),
  vertical: storyVerticalSchema,
  countryCode: z.string().length(2),
});

export const successStoryContinentSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  stories: z.array(successStorySchema).min(1),
});

export const successStoriesDataSchema = z.object({
  meta: z.object({
    version: z.number().int().positive(),
    storyCount: z.literal(100),
    locale: z.literal('en'),
  }),
  continents: z.array(successStoryContinentSchema).min(1),
  previewSlugs: z.array(z.string()).min(1),
});

export type StoryVertical = z.infer<typeof storyVerticalSchema>;
export type SuccessStory = z.infer<typeof successStorySchema>;
export type SuccessStoryContinent = z.infer<typeof successStoryContinentSchema>;
export type SuccessStoriesData = z.infer<typeof successStoriesDataSchema>;

export function parseSuccessStories(data: unknown): SuccessStoriesData {
  const parsed = successStoriesDataSchema.parse(data);
  const total = parsed.continents.reduce((n, c) => n + c.stories.length, 0);
  if (total !== 100) {
    throw new Error(`Expected 100 stories, got ${total}`);
  }
  return parsed;
}

export function storySlug(continentId: string, index: number): string {
  return `${continentId}:${index}`;
}

export function resolvePreviewStories(data: SuccessStoriesData): SuccessStory[] {
  return data.previewSlugs.map((slug) => {
    const [continentId, indexStr] = slug.split(':');
    const index = Number(indexStr);
    const continent = data.continents.find((c) => c.id === continentId);
    if (!continent) {
      throw new Error(`Unknown continent in preview slug: ${slug}`);
    }
    const story = continent.stories[index];
    if (!story) {
      throw new Error(`Unknown story index in preview slug: ${slug}`);
    }
    return story;
  });
}
