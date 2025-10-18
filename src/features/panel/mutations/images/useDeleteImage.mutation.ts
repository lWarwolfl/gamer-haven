import { QUERY_KEYS } from '@/features/panel/queries/keys'
import { deleteImageAction } from '@/server/image/deleteImage.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteImageAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGES, 1] })
    },
  })
}
