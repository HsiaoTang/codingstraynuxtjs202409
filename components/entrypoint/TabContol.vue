<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, type Component, type Ref } from 'vue';

export interface TabFuncProps {
  title: string;
  icon: object | string;
  component: Component
  content: any;
}

const topicObject = {
  topic: 'topic'
}

const props = defineProps<{ tabFuncs: TabFuncProps[] }>();
const activeTab: Ref<number> = ref(0);

const { t } = useI18n();

</script>
<template>
  <div class="grid pt-8 bg-green-50 justify-items-center">
    <ul class="flex w-5/6 justify-between">
      <li class="w-1/3" v-for="(tab, idx) in props.tabFuncs">
        <div 
          :class="['flex hover:cursor-pointer rounded-t-md border-0 w-full h-10 text-green-800 justify-center items-center transition duration-500',
            activeTab === idx ? 'bg-green-100 shadow-md' : 'shadow-inner']"
          @click="() => {
            activeTab = idx;
          }"
        >
          <component class="mr-2" :is="tab.icon" width="15" height="15" fill="currentColor"/>
          <span class="font-semibold">{{ t(tab.title) }}</span>
        </div>
      </li>
    </ul>
    <div class="w-5/6 bg-green-100 p-2 rounded-b-md shadow-md">
      <component :is="props.tabFuncs[activeTab].component" v-bind="props.tabFuncs[activeTab].content"/>
    </div>
  </div>
</template>