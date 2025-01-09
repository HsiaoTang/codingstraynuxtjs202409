<template>
  <nav class="fixed top-0 left-0 right-0 bg-green-100 h-14 p-2 shadow-md z-20">
    <div class="mx-2 flex items-center justify-between">
      <div class="text-green-800 text-lg font-semibold">
        <a href="/" class="flex items-center">
          <LogoSvg />
          <span class="px-3">{{ t('title') }}</span>
        </a>
      </div>
      <button class="p-0" @click="toggleSidebar">
        <MemberSvg />
      </button>
    </div>
    <!-- 背景遮罩 -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0 transition-opacity duration-1000"
      @click="toggleSidebar"
    ></div>

    <!-- 側邊欄 -->
    <div
      :class="[
        'fixed top-0 right-0 w-64 h-full bg-green-100 shadow-lg z-10 transform transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="p-4">
        <h2 class="text-lg font-bold mb-4">側邊欄內容</h2>
        <ul class="space-y-2">
          <li><a href="#" class="text-blue-500 hover:underline">選項 1</a></li>
          <li><a href="#" class="text-blue-500 hover:underline">選項 2</a></li>
          <li><a href="#" class="text-blue-500 hover:underline">選項 3</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LogoSvg from '~/assets/icons/logo.svg';
import MemberSvg from '~/assets/icons/member.svg';
import { ref } from 'vue';

const { t } = useI18n();

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};


</script>

<style scoped>

</style>
