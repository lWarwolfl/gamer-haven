import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { deleteGameAction } from '@/server/game/deleteGame.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteGameAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES, 1] })
    },
  })
}
