/**
 * Cloudflare Pages Middleware — Country Detection
 *
 * Injects a `pagayo_country` cookie with the visitor's ISO 3166-1 alpha-2
 * country code (from Cloudflare's cf-ipcountry). The cookie is read
 * client-side by the nav script to display the country name.
 *
 * - HttpOnly: false (must be readable by client JS)
 * - SameSite: Lax
 * - Path: /
 * - Max-Age: 1 hour (refreshed on each page load)
 */
export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();

  const country =
    (context.request as Request & { cf?: { country?: string } }).cf?.country ||
    "";

  if (country && country !== "XX") {
    response.headers.append(
      "Set-Cookie",
      `pagayo_country=${country}; Path=/; SameSite=Lax; Max-Age=3600`,
    );
  }

  return response;
};
