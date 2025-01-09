import { defineStore } from "pinia";
import { ref } from 'vue';

export const useThemeStore = defineStore('them', () => {
  const theme = ref('light');
  
  const toggleTheme = () =>  {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
  };

  return { theme, toggleTheme };

});


