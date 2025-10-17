import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { listGamesAction } from '@/server/game/listGames.action'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useListGames() {
  return useQuery({
    queryFn: async () => listGamesAction(),
    queryKey: [QUERY_KEYS.GAMES],
  })
}

export function useListGamesSuspense() {
  return useSuspenseQuery({
    queryFn: async () => listGamesAction(),
    queryKey: [QUERY_KEYS.GAMES],
  })
}
