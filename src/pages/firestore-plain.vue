<script setup lang="ts">
import { doc, getFirestore } from 'firebase/firestore'
import { useDocument } from 'vuefire'

const db = getFirestore()
const configRef = doc(db, 'configs', 'jORwjIykFo2NmkdzTkhU')
// const itemRef = doc(db, 'tests', 'item')

const { data: config } = useDocument(configRef)
// const { data: hey } = useDocument(configRef)
</script>

<template>
  <pgr>config:</pgr>
  <pre class="text-left">{{ config }}</pre>
</template>
