<script setup lang="ts">
import { usePendingPromises } from 'vuefire'
import { ref } from 'vue'

const store = useFirestoreConfig()

const isAllDoneFetching = ref(false)

onServerPrefetch(() => usePendingPromises())

// if (import.meta.env.SSR) {
//   await usePendingPromises().then((data) => {
//     isAllDoneFetching.value = true
//     console.log('data', data)
//     console.log('pinia', getActivePinia()?.state.value['fire-config'])
//   })
// }
</script>

<template>
  <p>config:</p>
  <p>All finished: {{ isAllDoneFetching }}</p>
  <pre class="text-left">{{ store.config }}</pre>
</template>
