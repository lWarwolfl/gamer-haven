import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cv3kagunkjo5ft8f.public.blob.vercel-storage.com/**')],
  },
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
