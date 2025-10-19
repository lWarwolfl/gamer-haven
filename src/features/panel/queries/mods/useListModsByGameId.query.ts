import { QUERY_KEYS } from '@/features/panel/queries/keys'
import {
  listModsByGameIdAction,
  ListModsByGameIdActionProps,
} from '@/server/mod/listModsByGameId.action'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useListModsByGameId(data: ListModsByGameIdActionProps) {
  return useQuery({
    queryFn: async () => listModsByGameIdAction(data),
    queryKey: [QUERY_KEYS.MOD, data.page, data.gameId],
  })
}

export function useListModsByGameIdSuspense(data: ListModsByGameIdActionProps) {
  return useSuspenseQuery({
    queryFn: async () => listModsByGameIdAction(data),
    queryKey: [QUERY_KEYS.MOD, data.page, data.gameId],
  })
}
