<script setup lang="ts">
import { doc, getFirestore } from 'firebase/firestore'
import { useDocument, usePendingPromises } from 'vuefire'
import { ref } from 'vue'

const db = getFirestore()
const configRef = doc(db, 'configs', 'jORwjIykFo2NmkdzTkhU')
// const itemRef = doc(db, 'tests', 'item')
const isDoneFetching = ref(false)
const isAllDoneFetching = ref(false)

const { data: config, promise } = useDocument(configRef, { wait: true })
// const { data: hey } = useDocument(configRef)

if (import.meta.env.SSR && typeof window === 'undefined') {
  await promise.value.then((data) => {
    isDoneFetching.value = true
    console.log('data', data)
  })
}

usePendingPromises().then((data) => {
  isAllDoneFetching.value = true
})
</script>

<template>
  <p>config:</p>
  <p>finished: {{ isDoneFetching }}</p>
  <p>All finished: {{ isAllDoneFetching }}</p>
  <pre class="text-left">{{ config }}</pre>
</template>
