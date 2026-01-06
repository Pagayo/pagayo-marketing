// Helper functions for country config
// Usage: import { getBasePath } from '../utils/country.js';

/**
 * Get the base path for a country
 * @param {Object} country - Country config object
 * @returns {string} - Base path like "/eu/nl"
 */
export function getBasePath(country) {
  return `/${country.region}/${country.code}`;
}

/**
 * Get a full path for a country
 * @param {Object} country - Country config object
 * @param {string} path - Relative path like "/features"
 * @returns {string} - Full path like "/eu/nl/features"
 */
export function getFullPath(country, path) {
  const basePath = getBasePath(country);
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

/**
 * Replace {year} placeholder in string with current year
 * @param {string} text - Text with {year} placeholder
 * @returns {string} - Text with year replaced
 */
export function replacePlaceholders(text) {
  return text.replace('{year}', new Date().getFullYear().toString());
}
