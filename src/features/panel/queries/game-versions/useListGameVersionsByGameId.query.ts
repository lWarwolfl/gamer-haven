import { QUERY_KEYS } from '@/features/panel/queries/keys'
import {
  listGameVersionsByGameIdAction,
  ListGameVersionsByGameIdActionProps,
} from '@/server/game-version/listGameVersionsByGameId.action'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useListGameVersionsByGameId(data: ListGameVersionsByGameIdActionProps) {
  return useQuery({
    queryFn: async () => listGameVersionsByGameIdAction(data),
    queryKey: [QUERY_KEYS.GAME_VERSIONS, data.page, data.gameId],
  })
}

export function useListGameVersionsByGameIdSuspense(data: ListGameVersionsByGameIdActionProps) {
  return useSuspenseQuery({
    queryFn: async () => listGameVersionsByGameIdAction(data),
    queryKey: [QUERY_KEYS.GAME_VERSIONS, data.page, data.gameId],
  })
}
