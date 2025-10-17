import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="bg-card ring-primary text-muted-foreground rounded-md p-6 font-mono ring-2">
        {t('hello')} <span className="animate-caret-blink text-primary pb-0.5">|</span>
      </div>
    </div>
  )
}
