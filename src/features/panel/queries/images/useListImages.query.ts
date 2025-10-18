import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { listImagesAction } from '@/server/image/listImages.action'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export function useListImages(data: PaginationSchemaProps) {
  return useQuery({
    queryFn: async () => listImagesAction(data),
    queryKey: [QUERY_KEYS.IMAGES, data.page],
  })
}

export function useListImagesSuspense(data: PaginationSchemaProps) {
  return useSuspenseQuery({
    queryFn: async () => listImagesAction(data),
    queryKey: [QUERY_KEYS.IMAGES, data.page],
  })
}
