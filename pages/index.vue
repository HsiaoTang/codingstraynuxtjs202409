<template>
  <TabContol />
</template>

<script setup lang="ts">
import { definePageMeta } from '~/node_modules/nuxt/dist/pages/runtime/composables';
import TabContol from '~/components/common/TabContol.vue';

definePageMeta({ layout: 'entrypoint' })

</script>