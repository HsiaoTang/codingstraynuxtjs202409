<script setup lang="ts">
import { useThemeStore } from '~/stores/theme';
import { useI18n } from 'vue-i18n';
import { useRuntimeConfig } from '~/node_modules/nuxt/dist/app';

const runtimeConfig = useRuntimeConfig()
const themeStore = useThemeStore();
const { t } = useI18n();
// onMounted(() => {
//   setLocale('en');
// })

</script>

<template>
  <div>
    <button @click="themeStore.toggleTheme">test theme</button>
    <p>theme: {{ themeStore.theme }} </p>
    <p>{{ t('test.test') }}</p>
    <a :href="runtimeConfig.public.keycloakUrl">test env</a>
  </div>
</template>