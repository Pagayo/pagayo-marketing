module.exports = function (eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.addPassthroughCopy('src/images');

  // Watch for changes
  eleventyConfig.addWatchTarget('src/styles/');

  // Add filter to resolve paths based on country
  eleventyConfig.addFilter('countryPath', function (path, country) {
    return `/${country.region}/${country.code}${path}`;
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
