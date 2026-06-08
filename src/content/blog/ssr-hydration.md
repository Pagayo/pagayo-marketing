---
title: "SSR Hydration: when the server HTML meets client JavaScript"
description: "Server-side rendering gets your shop on screen fast. Hydration is where things get interesting — and where many commerce sites stumble. Here's how Pagayo thinks about the handoff."
category: "Engineering"
author:
  name: "Pagayo Engineering"
  role: "Platform"
pubDate: 2026-06-08
featured: true
draft: false
---

Every modern commerce storefront starts with a simple promise: show the customer something useful before JavaScript finishes loading. That is server-side rendering — SSR for short. The browser receives HTML that already contains your product grid, your navigation, your prices. The page is readable in milliseconds, even on a slow connection in Lagos or a crowded café in Amsterdam.

But HTML alone is not enough for a shop. Customers need to add items to a cart, open a size picker, apply a coupon, or complete checkout. That interactivity lives in JavaScript. **Hydration** is the moment when the browser takes the server-rendered HTML and attaches client-side behaviour to it — event listeners, state, animations, form validation. It is the bridge between "fast first paint" and "actually works like an app."

When that bridge is built well, shoppers never notice it. When it is built poorly, they notice immediately.

## Why commerce sites care about SSR

Search engines still reward pages that render meaningful content without executing a megabyte of JavaScript first. Shoppers on mobile networks care even more: a product page that paints in 400 ms converts better than one that shows a blank screen for three seconds while a bundle downloads.

For a platform like Pagayo — webshop, POS, subscriptions, memberships — SSR also keeps the experience consistent across channels. The same product data that powers your admin dashboard can be rendered at the edge, close to the customer, without waiting for a central origin server halfway around the world.

Cloudflare's edge network makes this practical at scale. HTML is generated once per cache window, served from hundreds of cities, and invalidated when inventory or pricing changes. That is edge-first rendering: cache and compute at the boundary, database only when the cache misses.

## What hydration actually does

Imagine the server sends this simplified markup:

```html
<button id="add-to-cart" data-product-id="42">Add to cart</button>
```

The button is visible immediately. Hydration runs client-side code that finds that button, wires up a click handler, connects it to a cart store, and maybe shows a loading state while the API call completes. The DOM node stays the same; the behaviour is layered on top.

Frameworks differ in how aggressively they hydrate:

- **Full-page hydration** attaches JavaScript to the entire document tree. Simple to reason about, but expensive — you pay for interactivity you may never use above the fold.
- **Partial hydration / islands** leave most of the page static and only hydrate the interactive regions: cart drawer, search autocomplete, payment form. Less JavaScript, faster time-to-interactive.
- **Progressive enhancement** ensures core flows (browse, read, navigate) work without JS; enhancements load when available.

Pagayo's storefront stack leans toward islands and progressive enhancement. A category page is mostly HTML. The mini-cart, variant selector, and checkout widgets are the parts that wake up on the client.

## Where hydration goes wrong

Three problems show up repeatedly in commerce projects.

### Hydration mismatch

The server rendered one thing; the client expected another. Classic causes: formatting dates in the user's local timezone on the client but UTC on the server, random IDs in markup, reading `window` during the initial render, or A/B test flags that differ between edge and browser.

The framework throws a warning — or worse, silently re-renders the subtree, causing a visible flash and discarded DOM work. On a product page with reviews, badges, and dynamic pricing, that flash erodes trust.

**Fix:** render deterministic markup on the server; defer locale- or client-only values until after hydration; use stable keys.

### Double data fetching

SSR fetches product data to build HTML. Then hydration runs, the client-side router mounts, and the same product is fetched again because the client store does not trust the server payload.

Shoppers see the right content, but you burned two round-trips and delayed interactivity. On metered connections, that hurts.

**Fix:** serialize the data the server already used into the page — often called "dehydrated state" or "server-passed props" — and hydrate the client store from that snapshot before any client fetch runs.

### Layout shift after hydration

Server HTML uses placeholder dimensions; client JavaScript swaps in carousels, sticky headers, or cookie banners that push content down. Core Web Vitals punish cumulative layout shift (CLS), and checkout abandonment follows.

**Fix:** reserve space in CSS for components that hydrate in; load critical UI in the initial HTML; avoid injecting large banners before the user interacts.

## How Pagayo approaches the handoff

Pagayo is built edge-first: cache API → KV → database, not the other way around. Product listings and static storefront pages are designed to be cache-friendly HTML. Interactive surfaces — cart, auth, payment element, admin widgets — are isolated so their JavaScript does not block the rest of the page.

That separation matters for operators who do not think in framework jargon. You get fast catalog pages without sacrificing a Stripe-powered checkout. You get SEO-friendly category URLs without shipping a React tree the size of a small operating system to every visitor.

Behind the scenes:

1. **Edge renders HTML** from cached catalog and CMS data where possible.
2. **Critical state is embedded** in the document so client islands do not re-fetch what the server already resolved.
3. **Islands hydrate independently** — a broken coupon widget does not take down the product gallery.
4. **Mutations go through the API** with idempotent handlers, so a double-submit during slow hydration does not create duplicate orders.

This mirrors how we handle payments: Stripe webhooks are verified, retried safely, and processed exactly once. Hydration deserves the same discipline — predictable inputs, explicit handoff, no silent duplication.

## Practical guidelines

Whether you run on Pagayo or audit your own stack, these rules keep hydration boring (which is good):

1. **Treat the server HTML as the source of truth for first paint.** Client code should enhance, not replace, unless you have a deliberate client-only route.
2. **Measure twice:** Time to First Byte, Largest Contentful Paint, and Time to Interactive tell different stories. Optimise the one your shoppers feel.
3. **Keep islands small.** If a component needs `useEffect` on mount only to read `document.cookie`, question whether it belongs in the server render path instead.
4. **Test on real devices.** Hydration bugs love fast MacBooks on gigabit fibre. They hate three-year-old Android phones on 3G.
5. **Log hydration failures.** A mismatch warning in development should become a structured error in production — `code`, `message`, `details` — not a silent re-render.

## The bigger picture

SSR gets your shop in front of customers quickly. Hydration is what makes it feel alive. The goal is not to maximise JavaScript; it is to minimise the gap between "I can see the product" and "I can buy the product" without sacrificing correctness, SEO, or edge performance.

Pagayo will keep publishing notes like this as we ship — edge patterns, commerce primitives, and the engineering choices behind a platform built to run everywhere from Banjul to Amsterdam on the same stack.

If you are building on Pagayo and hit a hydration edge case in your theme, [get in touch](/contact). We read every message — and good reports often become platform fixes, not just theme patches.
