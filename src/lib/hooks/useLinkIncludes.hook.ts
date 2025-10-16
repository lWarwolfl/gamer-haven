import { usePathname } from 'next/navigation'

export default function useLinkIncludes(paths: string[]) {
  const pathname = usePathname()

  const doesInclude = paths.some((path) => pathname?.includes(path))

  return {
    pathname,
    doesInclude,
  }
}
