'use client'

import { Badge } from '@/components/ui/badge'
import { cn, formatNumber } from '@/lib/utils'
import { TListModsByGameSlugAction } from '@/server/mod/listModsByGameSlug.action'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

export type ModCardProps = React.ComponentProps<'div'> & {
  mod: NonNullable<TListModsByGameSlugAction>['mods'][number]
  body?: boolean
}

export default function ModCard({ mod, className, body, ...props }: ModCardProps) {
  function Content() {
    return (
      <h3
        className={cn('flex items-center gap-3 text-lg font-medium', {
          'pt-5': body,
        })}
      >
        <span className="group-hover:underline">{mod.title}</span>

        <Badge>
          {mod.modVersions[0].version}

          <Icon icon="ph:package" className="size-5" />
        </Badge>

        <Badge variant="outline">
          {formatNumber(mod.modDownloads.length)}

          <Icon icon="ph:download" className="size-5" />
        </Badge>
      </h3>
    )
  }

  return (
    <div
      className={cn(
        'bg-card ring-border hover:bg-muted flex w-full items-center gap-4 rounded-lg p-4 ring transition-colors ring-inset',
        { 'items-start': body },
        className
      )}
      {...props}
    >
      <Image
        alt={mod.title}
        width={200}
        height={200}
        src={mod.logo}
        className="size-16 rounded-md object-cover object-center"
      />

      {body ? (
        <div className="group flex max-h-[60dvh] flex-col gap-1 overflow-y-auto pe-3 underline-offset-2">
          <Content />

          <div className="prose w-full" dangerouslySetInnerHTML={{ __html: mod.body || '' }} />
        </div>
      ) : (
        <Link href={`/mods/${mod.slug}`} className="group flex flex-col gap-1 underline-offset-2">
          <Content />

          <p className="line-clamp-2 text-sm group-hover:underline">{mod.description}</p>
        </Link>
      )}
    </div>
  )
}
