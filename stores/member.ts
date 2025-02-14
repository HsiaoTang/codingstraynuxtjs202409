import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';


export const useMemberStore = defineStore('memberStore', () => {
  const authorized: Ref<boolean> = ref(false);
  const setAuthorized: (isAuthorized: boolean) => void = (isAuthorized) => {
    authorized.value = isAuthorized;
  }

  const loading: Ref<boolean> = ref(true);
  const setLoading: (isLoading: boolean) => void = (isLoading) => {
    loading.value = isLoading;
  }

  return { 
    authorized, setAuthorized,
    loading, setLoading,
  }
})