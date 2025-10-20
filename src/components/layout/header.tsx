'use client'

import { ThemeToggle } from '@/components/common/theme-toggle'
import logo from '@public/logo.svg'
import Image from 'next/image'

export default function Header() {
  // const { mainItems } = useLinks()

  return (
    <>
      <header className="flex w-full items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-6">
          <div className="text-foreground flex items-center">
            <Image alt="logo" src={logo} className="me-1 h-11 w-auto" />
            <span className="first-letter:text-primary text-xl font-semibold">GH</span>
          </div>

          {/* <div className="flex items-center gap-3">
            {mainItems.map((item) => (
              <Button
                key={item.name}
                variant={item.isActive ? 'default' : 'secondary'}
                className={cn({ 'pointer-events-none': item.isActive })}
                asChild
              >
                <Link href={item.path}>{item.name}</Link>
              </Button>
            ))}
          </div> */}
        </div>

        <div className="flex items-center gap-4">
          {/* <div className="max-sm:hidden">
            <SearchBar />
          </div> */}

          <ThemeToggle />
        </div>
      </header>

      {/* <div className="sm:hidden">
        <SearchBar />
      </div> */}
    </>
  )
}
