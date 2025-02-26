import { useMemberStore } from '~/stores/member';
import { defineNuxtRouteMiddleware, useCookie, useNuxtApp } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to, from) => {

  if(import.meta.client) {
    const token = useCookie('token');
    const { $getKcInstanceInited, $getKcInstance, $keycloak } = useNuxtApp();
    // const keycloak = await $getKcInstanceInited();
    // const keycloak = $getKcInstance();
    await $keycloak.init({
      onLoad: 'check-sso',
      responseMode: 'query',
    });
    console.log($keycloak);
    if(!$keycloak.authenticated) token.value = null;
    const member = useMemberStore();
    console.log(member.authorized);
  }
});
