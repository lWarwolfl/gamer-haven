import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { GameCreateSchemaProps } from '@/features/panel/schemas/game.schema'
import { createGameAction } from '@/server/game/createGame.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (game: GameCreateSchemaProps) => createGameAction(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
