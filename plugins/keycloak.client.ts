import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';
import Keycloak from 'keycloak-js';

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  
  const keycloak: Keycloak = new Keycloak({
    url: runtimeConfig.public.keycloakUrl ?? 'http://localhost:9090',
    realm: runtimeConfig.public.keycloakRealm ?? 'coding_stray',
    clientId: runtimeConfig.public.keycloakClientId ?? 'frontend',
  });
  

    // const member = useMemberStore();
    // const token = useCookie('token');
    
  await keycloak.init({ 
    onLoad: 'check-sso',
    responseMode: 'query',
  });

  const getKcInstance: () => Keycloak = () => {
    const keycloak: Keycloak = new Keycloak({
      url: runtimeConfig.public.keycloakUrl ?? 'http://localhost:9090',
      realm: runtimeConfig.public.keycloakRealm ?? 'coding_stray',
      clientId: runtimeConfig.public.keycloakClientId ?? 'frontend',
    });
    keycloak.init({ 
      onLoad: 'check-sso',
      responseMode: 'query',
    })

    return keycloak;
  }
    
  nuxtApp.provide('getKcInstance', getKcInstance);
  nuxtApp.provide('keycloak', keycloak);
});