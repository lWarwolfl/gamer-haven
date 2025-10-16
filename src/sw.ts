//import firebase service worker
import '@/features/firebase/firebase-messaging-sw'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { disableDevLogs, Serwist } from 'serwist'

disableDevLogs()

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: WorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true, // force new SW to activate immediately
  clientsClaim: true, // take control of all open pages
  navigationPreload: false,
  runtimeCaching: [],
})

serwist.addEventListeners()
