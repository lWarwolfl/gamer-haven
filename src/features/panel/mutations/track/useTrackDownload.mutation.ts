import { trackDownloadAction } from '@/server/track/trackDownload.action'
import { useMutation } from '@tanstack/react-query'

export function useTrackDownload() {
  return useMutation({
    mutationFn: (data: string) => trackDownloadAction(data),
  })
}
