import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { GameVersionCreateSchemaProps } from '@/features/panel/schemas/gameVersion.schema'
import { createGameVersionAction } from '@/server/game-version/createGameVersion.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateGameVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: GameVersionCreateSchemaProps) => createGameVersionAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAME_VERSIONS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
