import { defineNuxtPlugin, useCookie, useRuntimeConfig } from 'nuxt/app';
import Keycloak from 'keycloak-js';
import { useMemberStore } from '~/stores/member';

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const getKcInstance: () => Keycloak = () => { 
    const kcInstance = new Keycloak({
      url: runtimeConfig.public.keycloakUrl ?? 'http://localhost:9090',
      realm: runtimeConfig.public.keycloakRealm ?? 'coding_stray',
      clientId: runtimeConfig.public.keycloakClientId ?? 'frontend',
    });

    const member = useMemberStore();
    // const token = useCookie('token');
    
    kcInstance.init({ 
      onLoad: 'check-sso',
      responseMode: 'query',
    })
      .then((isAuth) => {
        member.setAuthorized(isAuth);
        if(isAuth && kcInstance.token) {
          // token.value = kcInstance.token;
          console.log(kcInstance);
        }
      })
      .catch((e) => {
        console.error(e);
        member.setAuthorized(false);
      });
    
    return kcInstance;
  }
  nuxtApp.provide('getKcInstance', getKcInstance);
});