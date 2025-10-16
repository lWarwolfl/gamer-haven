import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, systemTheme, theme } = useTheme()

  function switchTheme() {
    setTheme(
      theme === 'system'
        ? systemTheme === 'dark'
          ? 'light'
          : 'dark'
        : theme === 'dark'
          ? 'light'
          : 'dark'
    )
  }

  return (
    <Button variant="outline" size="icon" onClick={() => switchTheme()}>
      <Icon
        icon="line-md:moon-to-sunny-outline-loop-transition"
        className="absolute block size-5 dark:hidden"
      />
      <Icon
        icon="line-md:sunny-outline-to-moon-alt-loop-transition"
        className="absolute hidden size-5 dark:block"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
