import { getApp as getFirebaseApp } from 'firebase/app'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { VueFireAppCheckServer } from 'vuefire/server'
import type { UserModuleAsync } from '~/types'

export const install: UserModuleAsync = async () => {
  // only initialize the admin sdk once
  if (!getApps().length) {
    const adminApp
      // this is specified when deployed on Firebase and automatically picks up the credentials from env variables
      = process.env.GCLOUD_PROJECT
        ? initializeApp()
        : initializeApp({
          // must be ran from the root of the project
          credential: cert('./service-account.json'),
        })

    VueFireAppCheckServer(adminApp, getFirebaseApp())
  }
}
