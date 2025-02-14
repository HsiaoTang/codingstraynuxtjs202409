import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export const useToastStore = defineStore('toast', () => {
  const toasts: Ref<Toast[]> = ref([]);
  
  const addToast: (message: string, type: 'success' | 'error' | 'info') => void = (message, type) => {
    const id: number = Date.now();
    toasts.value.push({ id, message, type });
  }
  
  const removeToast: (id: number) => void = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  }
  
  return {
    toasts, addToast, removeToast
  }
})