import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { deleteGameVersionAction } from '@/server/game-version/deleteGameVersion.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteGameVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteGameVersionAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAME_VERSIONS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
