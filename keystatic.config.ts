import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Pagayo Marketing',
    },
    navigation: {
      Content: ['countries', 'blogPosts'],
      Settings: ['siteSettings'],
    },
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings/site',
      schema: {
        siteName: fields.text({ label: 'Site naam' }),
        tagline: fields.text({ label: 'Tagline' }),
        defaultLocale: fields.select({
          label: 'Default locale',
          options: [
            { label: 'Nederlands', value: 'nl' },
            { label: 'Duits', value: 'de' },
            { label: 'Engels', value: 'en' },
          ],
          defaultValue: 'nl',
        }),
      },
    }),
  },
  collections: {
    countries: collection({
      label: 'Countries',
      slugField: 'code',
      path: 'src/content/countries/*',
      format: { data: 'json' },
      schema: {
        code: fields.text({
          label: 'Country code (2-letter)',
          validation: { isRequired: true },
        }),
        region: fields.select({
          label: 'Region',
          options: [
            { label: 'Europe', value: 'eu' },
            { label: 'Americas', value: 'am' },
            { label: 'Africa', value: 'af' },
            { label: 'Asia', value: 'as' },
            { label: 'Oceania', value: 'oc' },
            { label: 'Middle East', value: 'me' },
          ],
          defaultValue: 'eu',
        }),
        name: fields.text({ label: 'Country name', validation: { isRequired: true } }),
        locale: fields.text({ label: 'Locale (e.g. nl-NL)' }),
        currency: fields.text({ label: 'Currency code (e.g. EUR)' }),
        language: fields.text({ label: 'Language name' }),
        published: fields.checkbox({ label: 'Published', defaultValue: true }),
        nav: fields.object(
          {
            features: fields.text({ label: 'Features label', defaultValue: 'Features' }),
            pricing: fields.text({ label: 'Pricing label', defaultValue: 'Pricing' }),
            contact: fields.text({ label: 'Contact label', defaultValue: 'Contact' }),
            cta: fields.text({ label: 'CTA label', defaultValue: 'Start free' }),
          },
          { label: 'Navigation labels' }
        ),
        meta: fields.object(
          {
            tagline: fields.text({ label: 'Tagline' }),
          },
          { label: 'Meta info' }
        ),
      },
    }),
    blogPosts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        description: fields.text({ label: 'Description', multiline: true }),
        publishDate: fields.date({ label: 'Publish date' }),
        author: fields.text({ label: 'Author' }),
        locale: fields.select({
          label: 'Language',
          options: [
            { label: 'Nederlands', value: 'nl' },
            { label: 'Duits', value: 'de' },
            { label: 'Engels', value: 'en' },
          ],
          defaultValue: 'nl',
        }),
        featured: fields.checkbox({ label: 'Featured post', defaultValue: false }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        image: fields.image({
          label: 'Featured image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});
