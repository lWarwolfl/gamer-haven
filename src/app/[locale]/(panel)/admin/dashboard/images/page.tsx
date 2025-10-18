import SectionHeader from '@/features/panel/components/common/section-header'
import ImageCreateDrawer from '@/features/panel/components/images/image-create-drawer'
import ImageTable from '@/features/panel/components/images/image-table'
import { getTranslations } from 'next-intl/server'

export default async function GamesPage() {
  const t = await getTranslations('panel.images.page')

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader section={t('title')} action={<ImageCreateDrawer />} />

      <ImageTable />
    </div>
  )
}
