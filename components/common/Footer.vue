<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';

const { t, locale, availableLocales } = useI18n();
const currentYear: number = new Date().getFullYear();

const isScrolled: Ref<boolean> = ref(false);

const handleScroll: () => void = () => {
    const scrollTop: number = window.scrollY;
    isScrolled.value = scrollTop > 32;
  }

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
<template>
  <footer 
    :class="['fixed bottom-0 left-0 right-0 h-16 p-2 z-10 content-center transition duration-500',
      isScrolled ? 'bg-green-100' : 'bg-transparent'
    ]" 
    :style="isScrolled ? 'box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1)' : ''"
  >
    <div class="flex justify-between">
      <div class="">
        
      </div>
      <div 
        :class="['font-semibold',
          isScrolled ? 'text-green-800': 'text-green-100'
        ]">
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