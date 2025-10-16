'use client'

import SearchBar from '@/components/common/search-bar'
import { ThemeToggle } from '@/components/common/theme-handler'
import { Button } from '@/components/ui/button'
import { useLinks } from '@/lib/hooks/useLinks.hook'
import logo from '@public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const { mainItems } = useLinks()

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4">
          <div className="text-foreground flex items-center">
            <Image alt="logo" src={logo} className="me-2 h-8 w-auto" />
            <span className="first-letter:text-primary">GH</span>
          </div>

          <div className="flex items-center gap-3">
            {mainItems.map((item) => (
              <Button key={item.name} variant="secondary" asChild>
                <Link href={item.path}>{item.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="max-sm:hidden">
            <SearchBar />
          </div>

          <ThemeToggle />
        </div>
      </div>

      <div className="sm:hidden">
        <SearchBar />
      </div>
    </>
  )
}
