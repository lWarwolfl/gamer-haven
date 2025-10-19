import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { ModVersionCreateSchemaProps } from '@/features/panel/schemas/modVersion.schema'
import { createModVersionAction } from '@/server/mod-version/createModVersion.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateModVersion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ModVersionCreateSchemaProps) => createModVersionAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOD_VERSIONS] })
    },
  })
}
