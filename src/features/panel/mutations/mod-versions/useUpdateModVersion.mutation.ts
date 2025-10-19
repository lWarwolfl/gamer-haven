import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { ModVersionUpdateSchemaProps } from '@/features/panel/schemas/modVersion.schema'
import { updateModVersionAction } from '@/server/mod-version/updateModVersion.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateModVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (game: ModVersionUpdateSchemaProps) => updateModVersionAction(game),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOD_VERSIONS] })
    },
  })
}
