'use client'

import LanguageSelector from '@/components/common/language-selector'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useLinks } from '@/lib/hooks/useLinks.hook'
import { Icon } from '@iconify/react'
import logo from '@public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const { socialItems } = useLinks()

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row md:gap-6">
      <div className="text-foreground flex items-center max-sm:order-1">
        <Image alt="logo" src={logo} className="me-2 h-8 w-auto" />
        <span className="first-letter:text-primary">GamerHaven</span>
        <span className="ml-1.5"> © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSelector />

        <TooltipProvider>
          {socialItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Button size="icon" variant="secondary" asChild>
                  <Link href={item.url} target="_blank">
                    <Icon className="size-4.5 shrink-0" icon={item.icon} />
                  </Link>
                </Button>
              </TooltipTrigger>

              <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
