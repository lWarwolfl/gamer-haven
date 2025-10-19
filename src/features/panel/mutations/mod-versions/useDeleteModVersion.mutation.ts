import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { deleteModVersionAction } from '@/server/mod-version/deleteModVersion.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteModVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteModVersionAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOD_VERSIONS] })
    },
  })
}
