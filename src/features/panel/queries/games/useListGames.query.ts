import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { listGamesAction } from '@/server/game/listGames.action'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useListGames(data: PaginationSchemaProps) {
  return useQuery({
    queryFn: async () => listGamesAction(data),
    queryKey: [QUERY_KEYS.GAMES, data.page],
  })
}

export function useListGamesSuspense(data: PaginationSchemaProps) {
  return useSuspenseQuery({
    queryFn: async () => listGamesAction(data),
    queryKey: [QUERY_KEYS.GAMES, data.page],
  })
}
