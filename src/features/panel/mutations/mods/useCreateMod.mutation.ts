import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { ModCreateSchemaProps } from '@/features/panel/schemas/mod.schema'
import { createModAction } from '@/server/mod/createMod.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateMod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ModCreateSchemaProps) => createModAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOD] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GAMES] })
    },
  })
}
