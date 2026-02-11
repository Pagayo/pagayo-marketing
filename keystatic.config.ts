import { config, fields, collection, singleton } from '@keystatic/core';

// ─── Reusable SEO fields for all pages ───
const seoFields = fields.object(
  {
    ogImage: fields.text({ label: 'OG Image path', defaultValue: '/og-image.svg' }),
    ogType: fields.text({ label: 'OG Type', defaultValue: 'website' }),
    twitterCard: fields.select({
      label: 'Twitter Card Type',
      options: [
        { label: 'Summary Large Image', value: 'summary_large_image' },
        { label: 'Summary', value: 'summary' },
      ],
      defaultValue: 'summary_large_image',
    }),
    noIndex: fields.checkbox({ label: 'Exclude from search engines', defaultValue: false }),
    canonicalPath: fields.text({ label: 'Canonical path (e.g. /ie/pricing)' }),
    alternates: fields.array(
      fields.object({
        lang: fields.text({ label: 'Language code (e.g. en)' }),
        hreflang: fields.text({ label: 'hreflang (e.g. en-IE)' }),
        href: fields.text({ label: 'Full URL' }),
      }),
      {
        label: 'Alternate language versions (hreflang)',
        itemLabel: (props) =>
          `${props.fields.hreflang.value || 'new'} → ${props.fields.href.value || ''}`,
      }
    ),
    structuredData: fields.object(
      {
        type: fields.select({
          label: 'Schema.org type',
          options: [
            { label: 'WebSite', value: 'WebSite' },
            { label: 'Organization', value: 'Organization' },
            { label: 'WebPage', value: 'WebPage' },
          ],
          defaultValue: 'WebSite',
        }),
        name: fields.text({ label: 'Name' }),
        url: fields.text({ label: 'URL' }),
      },
      { label: 'Structured Data (Schema.org)' }
    ),
  },
  { label: '🔍 SEO' }
);

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Pagayo Marketing',
    },
    navigation: {
      '🇬🇧 English (Master)': ['pagesEn'],
      Portal: ['portal'],
      'Site Settings': ['header', 'footer'],
      Blog: ['blogPosts'],
    },
  },
  singletons: {
    header: singleton({
      label: 'Header',
      path: 'src/content/header',
      format: { data: 'json' },
      schema: {
        logo: fields.text({ label: 'Logo text' }),
        nav: fields.object({
          en: fields.array(
            fields.object({
              label: fields.text({ label: 'Label' }),
              url: fields.text({ label: 'URL' }),
            }),
            { label: 'English Navigation', itemLabel: (props) => props.fields.label.value }
          ),
        }),
        cta: fields.object({
          en: fields.object({
            label: fields.text({ label: 'CTA Label' }),
            url: fields.text({ label: 'CTA URL' }),
          }),
        }),
      },
    }),
    footer: singleton({
      label: 'Footer',
      path: 'src/content/footer',
      format: { data: 'json' },
      schema: {
        copyright: fields.object({
          en: fields.text({ label: 'English Copyright' }),
        }),
        tagline: fields.object({
          en: fields.text({ label: 'English Tagline' }),
        }),
        links: fields.object({
          en: fields.array(
            fields.object({
              label: fields.text({ label: 'Label' }),
              url: fields.text({ label: 'URL' }),
            }),
            { label: 'English Links', itemLabel: (props) => props.fields.label.value }
          ),
        }),
      },
    }),
    portal: singleton({
      label: 'Portal Page',
      path: 'src/content/pages/en/portal',
      format: { data: 'json' },
      schema: {
        slug: fields.text({ label: 'Slug' }),
        title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        lang: fields.text({ label: 'Language code', defaultValue: 'en' }),
        countryFlag: fields.text({
          label: 'Country flag emoji (e.g. 🇮🇪)',
          validation: { isRequired: true },
        }),
        tagline: fields.object(
          {
            before: fields.text({ label: 'Tagline (before separator)' }),
            separator: fields.text({ label: 'Separator character', defaultValue: '—' }),
            after: fields.text({ label: 'Tagline (after separator)' }),
          },
          { label: 'Tagline' }
        ),
        actions: fields.object(
          {
            createOrder: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                url: fields.text({ label: 'URL' }),
              },
              { label: 'Create Order' }
            ),
            signIn: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                url: fields.text({ label: 'URL' }),
              },
              { label: 'Sign In' }
            ),
            createAccount: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                url: fields.text({ label: 'URL' }),
              },
              { label: 'Create Account' }
            ),
            learnMore: fields.object(
              {
                label: fields.text({ label: 'Label' }),
                url: fields.text({ label: 'URL' }),
              },
              { label: 'Learn More' }
            ),
          },
          { label: 'Action Buttons' }
        ),
        themeToggle: fields.object(
          {
            ariaLabel: fields.text({ label: 'Aria Label' }),
          },
          { label: 'Theme Toggle' }
        ),
        footer: fields.object(
          {
            helpText: fields.text({ label: 'Help Text' }),
            helpLink: fields.object(
              {
                label: fields.text({ label: 'Link Label' }),
                url: fields.text({ label: 'Link URL' }),
              },
              { label: 'Help Link' }
            ),
            brand: fields.text({ label: 'Brand Line' }),
            copyright: fields.text({ label: 'Copyright' }),
          },
          { label: 'Footer' }
        ),
        languages: fields.object(
          {
            flags: fields.array(fields.text({ label: 'Flag emoji' }), {
              label: 'Language Flags',
              itemLabel: (props) => props.value || '🏳️',
            }),
            moreLabel: fields.text({ label: 'More label (e.g. +50)' }),
          },
          { label: 'Language Selector' }
        ),
        seo: seoFields,
      },
    }),
  },
  collections: {
    pagesEn: collection({
      label: '🇬🇧 Pages (English)',
      slugField: 'slug',
      path: 'src/content/pages/en/*',
      format: { data: 'json' },
      schema: {
        slug: fields.text({ label: 'Slug', validation: { isRequired: true } }),
        title: fields.text({ label: 'Page Title', validation: { isRequired: true } }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow' }),
            headline: fields.text({ label: 'Headline' }),
            subheadline: fields.text({ label: 'Subheadline', multiline: true }),
            primaryCta: fields.object({
              label: fields.text({ label: 'Button Label' }),
              url: fields.text({ label: 'Button URL' }),
            }),
            secondaryCta: fields.object({
              label: fields.text({ label: 'Button Label' }),
              url: fields.text({ label: 'Button URL' }),
            }),
          },
          { label: 'Hero Section' }
        ),
        features: fields.array(
          fields.object({
            icon: fields.text({ label: 'Icon (emoji)' }),
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Features', itemLabel: (props) => props.fields.title.value }
        ),
        socialProof: fields.object(
          {
            headline: fields.text({ label: 'Headline' }),
            stats: fields.array(
              fields.object({
                number: fields.text({ label: 'Number' }),
                label: fields.text({ label: 'Label' }),
              }),
              { label: 'Stats', itemLabel: (props) => props.fields.label.value }
            ),
          },
          { label: 'Social Proof' }
        ),
        cta: fields.object(
          {
            headline: fields.text({ label: 'Headline' }),
            description: fields.text({ label: 'Description', multiline: true }),
            buttonLabel: fields.text({ label: 'Button Label' }),
          },
          { label: 'CTA Section' }
        ),
        seo: seoFields,
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
            { label: 'English', value: 'en' },
            { label: 'Nederlands', value: 'nl' },
            { label: 'Deutsch', value: 'de' },
          ],
          defaultValue: 'en',
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
