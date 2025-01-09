<template>
  <footer 
    class="fixed bottom-0 left-0 right-0 bg-green-100 h-14 p-2 shadow-md z-10 content-center" 
    style="box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1)"
  >
    <div class="flex justify-between">
      <div class="">
        
      </div>
      <div class="text-green-800 ">
        &copy; {{ `${currentYear} ${t('title')}` }}, Inc.
      </div>
      <div class="">
        <select v-model="locale" class="w-28">
          <option v-for="localeOp in availableLocales" :key="localeOp" :value="localeOp" class="text-center">
            {{ t(localeOp) }}
          </option>
        </select>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale, availableLocales } = useI18n();
const currentYear = new Date().getFullYear();


</script>