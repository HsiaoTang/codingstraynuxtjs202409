<script setup lang="ts">
import { type MemberFunctions } from '~/components/common/Navbar.vue';
import { Navbar, Footer } from '~/components';
import { useNuxtApp } from 'nuxt/app';
import { onMounted, ref, type Ref } from 'vue';
import { LogoSvg, SignupSvg, LoginSvg, LogoutSvg } from '~/assets/icons';
import { useI18n } from 'vue-i18n';
import { useMemberStore } from '~/stores/member';
import Keycloak from 'keycloak-js';

const { t } = useI18n();
const { $keycloak } = useNuxtApp();
const member = useMemberStore(); 

const scrollEffectOn: Ref<boolean> = ref(false);

const memberFuncs: MemberFunctions[] = [
{
    show: !member.authorized,
    onClick: async () => {
      const keycloak: Keycloak = $keycloak;
      keycloak.register();
    },
    icon: SignupSvg,
    funcName: 'sign_up'
  },
  {
    show: !member.authorized,
    onClick: async () => {
      const keycloak: Keycloak = $keycloak;
      keycloak.login();
    },
    icon: LoginSvg,
    funcName: 'log_in'
  },
  {
    show: member.authorized,
    onClick: async () => {
      const keycloak: Keycloak = $keycloak;
      keycloak.logout();
    },
    icon: LogoutSvg,
    funcName: 'log_out'
  }
]

onMounted(() => {
  // $getKcInstance();
})
</script>
<template>
  <div>
    <Navbar
      :title="t('title')" 
      :logoIcon="LogoSvg"
      :memberFuncs="memberFuncs"
      :scrollEffectOn="scrollEffectOn"
    />
    <main class="bg-green-50">
      <NuxtPage />
    </main>
    <Footer></Footer>
  </div>
</template>