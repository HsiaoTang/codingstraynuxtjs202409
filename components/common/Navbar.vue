<template>
  <nav :class="['fixed top-0 left-0 right-0 h-16 p-2 z-20 transition duration-500',
    isScrolled ? 'bg-green-100 shadow-md' : 'bg-transparent'
  ]">
    <div class="mx-2 flex items-center justify-between">
      <div :class="['text-lg font-semibold',
        isScrolled ? 'text-green-800' : 'text-green-100'
      ]">
        <a href="/" class="flex items-center">
          <component :is="props.logoIcon" width="45" height="45" fill="currentColor"/>
          <span class="px-3">{{ title }}</span>
        </a>
      </div>
      <div class="relative flex item-center w-2/5">
        <div class="absolute left-3 self-center text-gray-400">
          <SearchSvg width="24" height="24"/>
        </div>
        <input 
          class="w-full h-10 pl-12 shadow-inner rounded-md focus:bg-amber-50 focus:outline-gray-400" 
          :placeholder="t('search')"
        />
      </div>
      <a :class="['p-0 items-center cursor-pointer',
        isScrolled ? 'text-green-800' : 'text-green-100'
      ]">
        <MemberSvg width="40" height="40" fill="currentColor" @click="toggleSidebar"/>
      </a>
    </div>

    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0 transition-opacity duration-500"
      @click="toggleSidebar"
    ></div>

    <div :class="['fixed top-0 right-0 w-44 h-full bg-green-100 shadow-lg z-10 transform transition-transform duration-500',
      isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
    ]">
      <div class="p-4">
        <ClientOnly>
          <ul v-for="memberFunc in props.memberFuncs.filter(func => func.show === true)" >
            <li :key="memberFunc.funcName" class="flex">
              <a
                href="#" 
                class="flex p-2 space-x-4 text-green-800 items-center"
                @click="memberFunc.onClick"
              >
                <component :is="memberFunc.icon" width="40" height="40" fill="currentColor"/>
                <text>{{ t(memberFunc.funcName) }}</text>
              </a>
            </li>
          </ul>
        </ClientOnly>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { SearchSvg, MemberSvg } from '~/assets/icons';
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue';
import { useNuxtApp } from 'nuxt/app';

const { $keycloak } = useNuxtApp();

const { t } = useI18n();

const isSidebarOpen: Ref<boolean> = ref(false);

const toggleSidebar: () => void = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isScrolled: Ref<boolean> = ref(false);

const handleScroll: () => void = () => {
  const pageHeight: number = window.innerHeight;
  const scrollTop: number = window.scrollY;
  isScrolled.value = scrollTop > pageHeight + 32;
}

export interface MemberFunctions {
  show: boolean;
  onClick: () => void;
  icon: object | string;
  funcName: string,
}

interface NavbarProps {
  logoIcon?: object | string;
  title?: string;
  memberFuncs: MemberFunctions[];
  scrollEffectOn: boolean;
}

const props = withDefaults(defineProps<NavbarProps>(), 
  {
    logoIcon: '',
    title: '',
  }
);



onMounted(() => {
  console.log(props.memberFuncs);
  if(props.scrollEffectOn) {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>
