<script setup lang="ts">
import { useRuntimeConfig } from '~/node_modules/nuxt/dist/app';

const runtimeConfig = useRuntimeConfig()

interface IndexBackDropProps {
  webIntroLines?: string[],
  indexBackDropUrl?: string,
}

const props = withDefaults(defineProps<IndexBackDropProps>(), 
  {
    webIntroLines: () => [],
    indexBackDropUrl: '',
  }
);

</script>
<template>
  <div 
    class="flex flex-col bg-fixed bg-cover h-dvh text-green-100 text-2xl font-extrabold drop-shadow-md justify-center"
    :style="[{ 
      backgroundImage: `url('${runtimeConfig.public.imgResourcesBaseUrl}${props.indexBackDropUrl}')`,
    }]"
  >
    <div v-for="webIntro in props.webIntroLines" class="self-center">
      {{ webIntro }}
    </div>
  </div>
</template>