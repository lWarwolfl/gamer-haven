import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  if ('message' in error) return error.message
  return String(error)
}

export function getUsername(email: string | null | undefined) {
  return email ? email.split('@')[0] : ''
}

export function getFileExtension(blob: Blob): string {
  const mimeType = blob.type
  const extension = mimeType.split('/')[1]
  return extension || 'png'
}


