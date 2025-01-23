<template>
  <div class="grid grid-cols-2 md:grid-cols-3">
    <div 
      class="flex m-2 bg-cover bg-center h-48" 
      v-for="topicGridProps in props.topicGridPropsArray"
      :style="{ 
        backgroundImage: `url('${topicGridProps.url}')`
      }"
    >
      <span :class="['font-bold text-xl size-full text-transparent text-center content-center shadow-md transition duration-500',
          'hover:cursor-pointer hover:text-white hover:backdrop-brightness-75 hover:backdrop-blur-sm'
        ]"
      >
        {{ t(topicGridProps?.title) }}
      </span>
    </div>
  </div>
  <!-- <div>{{ props.topic }}</div> -->
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface TopicGridProps {
  title: string;
  url: string;
}

const props = defineProps<{ topicGridPropsArray: TopicGridProps[] }>();
const { t } = useI18n()

// const props = defineProps<{ topic: string }>()

</script>