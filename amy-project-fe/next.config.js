const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true,
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
});