'use client'

import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn, formatNumber } from '@/lib/utils'
import { TListGamesCachedAction } from '@/server/game/listGamesCached.action'
import { Icon } from '@iconify/react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'

export type GameCardProps = React.ComponentProps<'div'> & {
  game: TListGamesCachedAction['games'][number]
  logo?: boolean
}

export default function GameCard({ game, logo, className, ...props }: GameCardProps) {
  function Content() {
    return (
      <>
        <h3 className="flex items-center gap-3 text-lg font-medium">
          <span className="group-hover:underline">{game.title}</span>

          <Badge>
            {game.gameVersions[0].version}

            <Icon icon="ph:package" className="size-5" />
          </Badge>

          <Badge variant="outline">
            {formatNumber(game.mods.length)}

            <Icon icon="ph:puzzle-piece" className="size-5" />
          </Badge>
        </h3>

        <p className={cn('line-clamp-3 text-sm group-hover:underline', { 'line-clamp-2': logo })}>
          {game.description}
        </p>
      </>
    )
  }

  return (
    <div
      className={cn(
        'bg-card ring-border hover:bg-muted flex w-full flex-col gap-4 rounded-lg p-6 ring transition-colors ring-inset sm:gap-6 sm:p-8',
        { 'flex-row items-center p-4 sm:p-6': logo },
        className
      )}
      {...props}
    >
      {!logo ? (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
        >
          <CarouselContent>
            {game.images?.map((item, index) => (
              <CarouselItem key={index} className="lg:basis-1/2">
                <Image
                  alt={`${game.title}-image-${index}`}
                  width={1280}
                  height={720}
                  src={item}
                  className="mx-auto aspect-14/9 w-full max-w-xl rounded-lg object-cover object-center"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Image
          alt={game.title}
          width={200}
          height={200}
          src={game.logo}
          className="size-16 rounded-md object-cover object-center"
        />
      )}

      {logo ? (
        <div className="group flex flex-col gap-1 underline-offset-2">
          <Content />
        </div>
      ) : (
        <Link href={`/${game.slug}`} className="group flex flex-col gap-1 underline-offset-2">
          <Content />
        </Link>
      )}
    </div>
  )
}
