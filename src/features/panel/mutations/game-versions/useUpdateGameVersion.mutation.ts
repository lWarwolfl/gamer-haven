import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { GameVersionUpdateSchemaProps } from '@/features/panel/schemas/gameVersion.schema'
import { updateGameVersionAction } from '@/server/game-version/updateGameVersion.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateGameVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (game: GameVersionUpdateSchemaProps) => updateGameVersionAction(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAME_VERSIONS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
