import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { deleteModAction } from '@/server/mod/deleteMod.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteMod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteModAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOD] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
