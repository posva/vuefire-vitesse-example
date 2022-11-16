import { initializeApp } from 'firebase/app'
import { ReCaptchaV3Provider } from 'firebase/app-check'
import { VueFire, VueFireAppCheck, useSSRInitialState } from 'vuefire'
import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, initialState, app }) => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAkUKe36TPWL2eZTshgk-Xl4bY_R5SB97U',
    authDomain: 'vue-fire-store.firebaseapp.com',
    databaseURL: 'https://vue-fire-store.firebaseio.com',
    projectId: 'vue-fire-store',
    storageBucket: 'vue-fire-store.appspot.com',
    messagingSenderId: '998674887640',
    appId: '1:998674887640:web:1e2bb2cc3e5eb2fc3478ad',
    measurementId: 'G-RL4BTWXKJ7',
  })

  app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAppCheck({
        debug: process.env.NODE_ENV !== 'production',
        provider: new ReCaptchaV3Provider(
          '6LfJ0vgiAAAAAHheQE7GQVdG_c9m8xipBESx_SKI',
        ),
        isTokenAutoRefreshEnabled: true,
      }),
    ],
  })

  if (isClient) {
    useSSRInitialState(initialState.vuefire, firebaseApp)
  }
  else {
    // creates the initial state object and copies the object reference to the client. It gets updated by the running
    // app
    initialState.vuefire = useSSRInitialState()
  }
}
