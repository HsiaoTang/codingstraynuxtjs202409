import { defineNuxtRouteMiddleware, useNuxtApp } from "nuxt/app";
import { useMemberStore } from '~/stores/member';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if(import.meta.client) {
    const { $keycloak } = useNuxtApp();
    const member = useMemberStore();
    member.setAuthorized($keycloak.authenticated?? false);
    console.log($keycloak);
  }
});
