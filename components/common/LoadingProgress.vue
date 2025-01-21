<template>
  <div 
    class="fixed w-full h-4 bg-gray-400 z-30"
    :style="{width: progress + '%'}"
    v-if="loading"
  >

  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';

const loading: Ref<boolean> = ref(true);
const progress: Ref<number> = ref(0);

const handleLoad: () => void = () => {
  loading.value = true;
  progress.value = 100;
}

const handleProgress: (e: ProgressEvent) => void = (e) => {
  if(e.lengthComputable) {
    progress.value = (e.loaded / e.total) * 100;
  }
}

onMounted(() => {
  window.addEventListener('load', handleLoad);
  window.addEventListener('progress', handleProgress);
});

onUnmounted(() => {
  window.removeEventListener('load', handleLoad);
  window.removeEventListener('progress', handleProgress);
});
</script>