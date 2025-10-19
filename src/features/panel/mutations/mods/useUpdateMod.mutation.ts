import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { ModUpdateSchemaProps } from '@/features/panel/schemas/mod.schema'
import { updateModAction } from '@/server/mod/updateMod.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateMod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (game: ModUpdateSchemaProps) => updateModAction(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOD] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
