import { defineNuxtPlugin, useCookie } from 'nuxt/app';
import Keycloak from 'keycloak-js';
import { useMemberStore } from '~/stores/member';

export default defineNuxtPlugin(nuxtApp => {
  const getKcInstance: () => Keycloak = () => { 
    const kcInstance = new Keycloak({
      url: process.env.KEYCLOAK_URL || 'http://localhost:9090',
      realm: process.env.KEYCLOAK_REALM || 'coding_stray',
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'frontend',
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