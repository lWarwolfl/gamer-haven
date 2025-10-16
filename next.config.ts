import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
}

const withNextIntl = createNextIntlPlugin()

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
  dontCacheBustURLsMatching: /.*/,
  globPublicPatterns: [],
  include: [],
  exclude: [/.*/],
  cacheOnNavigation: false,
  maximumFileSizeToCacheInBytes: 0,
})

export default withSerwist(withNextIntl(nextConfig))
