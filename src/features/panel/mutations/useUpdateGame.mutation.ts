import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { GameUpdateSchemaProps } from '@/features/panel/schemas/game.schema'
import { updateGameAction } from '@/server/game/updateGame.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (game: GameUpdateSchemaProps) => updateGameAction(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
