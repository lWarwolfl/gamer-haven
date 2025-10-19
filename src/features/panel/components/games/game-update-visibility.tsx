'use client'

import { Switch } from '@/components/ui/switch'
import { useUpdateGame } from '@/features/panel/mutations/games/useUpdateGame.mutation'
import { TListGamesAction } from '@/server/game/listGames.action'
import { useState } from 'react'

export type GameUpdateVisibilityProps = { data: TListGamesAction['games'][number] }

export default function GameUpdateVisibility({ data }: GameUpdateVisibilityProps) {
  const [visible, setVisible] = useState<boolean>(data.visible)

  const { mutate: mutateUpdateGame, isPending: isPendingUpdateGame } = useUpdateGame()

  function onSubmit() {
    mutateUpdateGame(
      { id: data.id, visible: !visible },
      {
        onSuccess: (res) => {
          setVisible(res[0].visible)
        },
      }
    )
  }

  return <Switch onClick={() => onSubmit()} checked={visible} disabled={isPendingUpdateGame} />
}
