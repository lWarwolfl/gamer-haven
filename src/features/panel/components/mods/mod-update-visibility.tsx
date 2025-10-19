'use client'

import { Switch } from '@/components/ui/switch'
import { useUpdateMod } from '@/features/panel/mutations/mods/useUpdateMod.mutation'
import { TListModsByGameIdAction } from '@/server/mod/listModsByGameId.action'
import { useState } from 'react'

export type ModUpdateVisibilityProps = { data: TListModsByGameIdAction['mods'][number] }

export default function ModUpdateVisibility({ data }: ModUpdateVisibilityProps) {
  const [visible, setVisible] = useState<boolean>(data.visible)

  const { mutate: mutateUpdateMod, isPending: isPendingUpdateMod } = useUpdateMod()

  function onSubmit() {
    mutateUpdateMod(
      { id: data.id, visible: !visible },
      {
        onSuccess: (res) => {
          setVisible(res[0].visible)
        },
      }
    )
  }

  return <Switch onClick={() => onSubmit()} checked={visible} disabled={isPendingUpdateMod} />
}
