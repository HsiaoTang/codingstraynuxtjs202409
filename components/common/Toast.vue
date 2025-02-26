<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

const { toasts } = useToastStore();


</script>
<template>
  <div class="fixed top-1 left-1">
    <div v-for="toast in toasts" :key="toast.id">

      
    </div>
  </div>
</template>
