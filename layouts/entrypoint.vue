<script setup lang="ts">
import  { type MemberFunctions } from '~/components/common/Navbar.vue';
import { Navbar, IndexBackDrop, Footer } from '~/components';
import { useNuxtApp } from 'nuxt/app';
import { onMounted, ref, type Ref } from 'vue';
import { LogoSvg, SignupSvg, LoginSvg, LogoutSvg } from '~/assets/icons';
import { useI18n } from 'vue-i18n';
import { useMemberStore } from '~/stores/member';
import Keycloak from 'keycloak-js';

const { t, locale } = useI18n();

const { $getKcInstance, $getKcInstanceInited, $keycloak } = useNuxtApp();

const indexBackDropUrl: string = '/imgs/indexBackDrop.jpg';

const member = useMemberStore();

const memberFuncs: MemberFunctions[] = [
  {
    // show: true,
    show: !member.authorized,
    onClick: () => {
      // const keycloak: Keycloak = $getKcInstance();
      // const keycloak: Keycloak = await $getKcInstanceInited();
      const keycloak: Keycloak = $keycloak;
      keycloak.register();
    },
    icon: SignupSvg,
    funcName: 'sign_up'
  },
  {
    // show: true,
    show: !member.authorized,
    onClick: () => {
      // const keycloak: Keycloak = $getKcInstance();
      // const keycloak: Keycloak = await $getKcInstanceInited();
      const keycloak: Keycloak = $keycloak;
      const currentUri: string = window.location.href; 
      keycloak.login({ locale: locale.value, redirectUri: currentUri });
    },
    icon: LoginSvg,
    funcName: 'log_in'
  },
  {
    // show: true,
    show: member.authorized,
    onClick: () => {
      // const keycloak: Keycloak = $getKcInstance();
      // const keycloak: Keycloak = await $getKcInstanceInited();
      const keycloak: Keycloak = $keycloak;
      keycloak.logout();
    },
    icon: LogoutSvg,
    funcName: 'log_out'
  }
];
const isScrolledEffectOn: Ref<boolean> = ref(true);


onMounted(() => {

});
</script>
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