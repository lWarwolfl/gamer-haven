import { QUERY_KEYS } from '@/features/panel/queries/keys'
import {
  listModVersionsByModIdAction,
  ListModVersionsByModIdActionProps,
} from '@/server/mod-version/listModVersionsByModId.action'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useListModVersionsByModId(data: ListModVersionsByModIdActionProps) {
  return useQuery({
    queryFn: async () => listModVersionsByModIdAction(data),
    queryKey: [QUERY_KEYS.MOD_VERSIONS, data.page, data.modId],
  })
}

export function useListModVersionsByModIdSuspense(data: ListModVersionsByModIdActionProps) {
  return useSuspenseQuery({
    queryFn: async () => listModVersionsByModIdAction(data),
    queryKey: [QUERY_KEYS.MOD_VERSIONS, data.page, data.modId],
  })
}
