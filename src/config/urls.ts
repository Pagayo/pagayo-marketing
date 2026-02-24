/**
 * Environment-aware URL configuration
 * Development: localhost URLs
 * Production: pagayo.com/app URLs
 */

const isDev = import.meta.env.DEV;

export const urls = {
  /**
   * Sign In - Existing tenant login
   * Dev: localhost:3000/start/login (pagayo-storefront universal login)
   * Prod: start.pagayo.app/login
   */
  signIn: isDev ? 'http://localhost:3000/start/login' : 'https://start.pagayo.app/login',

  /**
   * Create Account - Direct claim registration (zero-friction without order)
   * Skips order creation, goes directly to account claim form.
   * Dev: localhost:3000/start/register (pagayo-storefront)
   * Prod: start.pagayo.app/register
   */
  createAccount: isDev
    ? 'http://localhost:3000/start/register'
    : 'https://start.pagayo.app/register',
} as const;

/**
 * Get environment-aware URL
 * @param key - URL key from urls object
 */
export function getUrl(key: keyof typeof urls): string {
  return urls[key];
}
