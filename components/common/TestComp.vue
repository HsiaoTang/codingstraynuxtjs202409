<template>
  <div>
    <button @click="themeStore.toggleTheme">test theme</button>
    <p>theme: {{ themeStore.theme }} </p>
    <p>{{ t('test.test') }}</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from '~/stores/theme';
import { useI18n } from 'vue-i18n';

const themeStore = useThemeStore();
const { t, setLocale } = useI18n();
// onMounted(() => {
//   setLocale('en');
// })

</script>
<style scoped>

</style>