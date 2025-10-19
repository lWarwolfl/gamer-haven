import { createUserTokenAction } from '@/server/track/createUserToken.action'
import { trackDownloadAction } from '@/server/track/trackDownload.action'
import { useMutation } from '@tanstack/react-query'

export function useTrackDownload() {
  return useMutation({
    mutationFn: async (data: string) => {
      await createUserTokenAction()
      return await trackDownloadAction(data)
    },
  })
}
