import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { ImageCreateSchemaProps } from '@/features/panel/schemas/image.schema'
import { createImageAction } from '@/server/image/createImage.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ImageCreateSchemaProps) => createImageAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGES] })
    },
  })
}
