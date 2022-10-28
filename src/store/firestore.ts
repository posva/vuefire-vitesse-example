import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useDocument } from 'vuefire'

export const useFirestoreConfig = defineStore('fire-config', () => {
  const db = getFirestore()
  const configRef = doc(db, 'configs', 'jORwjIykFo2NmkdzTkhU')

  const config = useDocument(configRef, { target: ref(), reset: false, wait: true })

  return { config }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFirestoreConfig, import.meta.hot))

