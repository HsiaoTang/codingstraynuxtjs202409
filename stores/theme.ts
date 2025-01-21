import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useThemeStore = defineStore('themeStore', () => {
  const theme: Ref<string> = ref('light');
  const toggleTheme: () => void = () =>  {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
  };

  return { theme, toggleTheme };

});


