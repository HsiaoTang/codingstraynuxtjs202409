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
<script setup lang="ts">
import { type MemberFunctions } from '~/components/common/Navbar.vue';
import { Navbar, Footer } from '~/components/common';
import { useNuxtApp } from 'nuxt/app';
import { onMounted, ref, type Ref } from 'vue';
import { LogoSvg, SignupSvg, LoginSvg, LogoutSvg } from '~/assets/icons';
import { useI18n } from 'vue-i18n';
import { useMemberStore } from '~/stores/member';

const { t } = useI18n();
const { $getKcInstance } = useNuxtApp();
const member = useMemberStore(); 

const scrollEffectOn: Ref<boolean> = ref(false);

const memberFuncs: MemberFunctions[] = [
  {
    show: !member.authorized,
    onClick: () => {
      $getKcInstance().register();
    },
    icon: SignupSvg,
    funcName: t('sign_up')
  },
  {
    show: !member.authorized,
    onClick: () => {
      $getKcInstance().login();
    },
    icon: LoginSvg,
    funcName: t('log_in')
  },
  {
    show: member.authorized,
    onClick: () => {
      $getKcInstance().logout();
    },
    icon: LogoutSvg,
    funcName: t('log_out')
  }
]

onMounted(() => {
  $getKcInstance();
})
</script>