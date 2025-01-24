import { defineNuxtPlugin, useCookie, useRuntimeConfig } from 'nuxt/app';
import Keycloak from 'keycloak-js';
import { useMemberStore } from '~/stores/member';

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const getKcInstance: () => Keycloak = () => { 
    const kcInstance = new Keycloak({
      url: runtimeConfig.public.keycloakUrl || 'http://localhost:9090',
      realm: runtimeConfig.public.keycloakRealm || 'coding_stray',
      clientId: runtimeConfig.public.keycloakClientId || 'frontend',
    });

    const member = useMemberStore();
    const token = useCookie('token');
    
    kcInstance.init({ 
      onLoad: 'check-sso',
      responseMode: 'query',
    })
      .then((auth) => {
        member.setAuthorized(auth);
        token.value = auth ? kcInstance.token : null;
      })
      .catch((e) => {
        member.setAuthorized(false);
        token.value = null;
        console.error(e);
      })
    
    return kcInstance;
  }
  nuxtApp.provide('getKcInstance', getKcInstance);
});