<template>
  <div>
    <Navbar
      :title="t('title')" 
      :logoIcon="LogoSvg"
      :memberFuncs="memberFuncs"
      :scrollEffectOn="isScrolledEffectOn"
    />
    <IndexBackDrop 
      :webIntroLines="[t('website_intro_pt1'), t('website_intro_pt2')]"
      :indexBackDropUrl="indexBackDropUrl"
    />
    <main class="bg-green-50 pb-32 z-10 h-[2000px]">
      <NuxtPage />
    </main>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import  { type MemberFunctions } from '~/components/common/Navbar.vue';
import { Navbar, IndexBackDrop, Footer } from '~/components/common';
import { useNuxtApp } from 'nuxt/app';
import { onMounted, ref, type Ref } from 'vue';
import { LogoSvg, SignupSvg, LoginSvg, LogoutSvg } from '~/assets/icons';
import { useI18n } from 'vue-i18n';
import { useMemberStore } from '~/stores/member';


const { t } = useI18n();

const { $getKcInstance } = useNuxtApp();

const indexBackDropUrl: string = '/imgs/indexBackDrop.jpg';

const member = useMemberStore();
const memberFuncs: MemberFunctions[] = [
  {
    show: !member.authorized,
    onClick: () => {
      $getKcInstance().register();
    },
    icon: SignupSvg,
    funcName: 'sign_up'
  },
  {
    show: !member.authorized,
    onClick: () => {
      $getKcInstance().login();
    },
    icon: LoginSvg,
    funcName: 'log_in'
  },
  {
    show: member.authorized,
    onClick: () => {
      $getKcInstance().logout();
    },
    icon: LogoutSvg,
    funcName: 'log_out'
  }
]
const isScrolledEffectOn: Ref<boolean> = ref(true);

onMounted(() => {
  $getKcInstance();
})
</script>