import { defineNuxtPlugin, useCookie, useRuntimeConfig } from 'nuxt/app';
import Keycloak from 'keycloak-js';
import { useMemberStore } from '~/stores/member';
import { useToastStore } from '~/stores/toast';

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const keycloak: Keycloak = new Keycloak({
    url: runtimeConfig.public.keycloakUrl ?? 'http://localhost:9090',
    realm: runtimeConfig.public.keycloakRealm ?? 'coding_stray',
    clientId: runtimeConfig.public.keycloakClientId ?? 'frontend',
  });

  
  const getKcInstanceInited: () => Promise<Keycloak> = async () => {
    const keycloak: Keycloak = new Keycloak({
      url: runtimeConfig.public.keycloakUrl ?? 'http://localhost:9090',
      realm: runtimeConfig.public.keycloakRealm ?? 'coding_stray',
      clientId: runtimeConfig.public.keycloakClientId ?? 'frontend',
    });
  
    

    keycloak.onAuthSuccess = () => {
      const member = useMemberStore();
      member.setAuthorized(keycloak.authenticated?? false);
      const expireInSec = (keycloak.idTokenParsed?.exp?? 0) - Date.now()/1000
      console.log(`'expireInSec: '${expireInSec}`);
      const token = useCookie('token', {
        maxAge: expireInSec
      })
      token.value = keycloak.token;
      setTimeout(() => {
        console.log('updateToken');
        keycloak.updateToken(5).catch((e) => keycloak.login());
      }, 20000);
    }

    keycloak.init({ 
      onLoad: 'check-sso',
      responseMode: 'query',
    })

    return keycloak;
  }
  

    // const member = useMemberStore();
    // const token = useCookie('token');

  // const getKcInstance: () => Keycloak = () => {
    // const keycloak: Keycloak = new Keycloak({
    //   url: runtimeConfig.public.keycloakUrl ?? 'http://localhost:9090',
    //   realm: runtimeConfig.public.keycloakRealm ?? 'coding_stray',
    //   clientId: runtimeConfig.public.keycloakClientId ?? 'frontend',
    // });

    

    keycloak.onAuthSuccess = () => {
      console.log(window.location.href);
      const member = useMemberStore();
      member.setAuthorized(keycloak.authenticated?? false);
      const expireInMillSecs = (keycloak.idTokenParsed?.exp?? 0) * 1000 - Date.now();
      console.log(`expireInMillSecs: ${expireInMillSecs}`);
      const token = useCookie('token', {
        expires: new Date(1000 * (keycloak.idTokenParsed?.exp?? 0))
      })
      token.value = keycloak.token;

      setTimeout(() => {
        console.log('test');
        console.log(keycloak.token);
        keycloak.updateToken(170).then((res) => {
          console.log(`response: ${res}`);
          console.log(keycloak.token);
        }).catch((e) => {
          console.error(`error: ${e}`);
          // keycloak.login();
        });
      }, 20000);
    }

    keycloak.onAuthLogout = () => {
      const token = useCookie('token')
      token.value = null;
    }

    // keycloak.init({ 
    //   onLoad: 'check-sso',
    //   responseMode: 'query',
    // })

  //   return keycloak;
  // }
  
  nuxtApp.provide('keycloak', keycloak);
  // nuxtApp.provide('getKcInstance', getKcInstance);
  nuxtApp.provide('getKcInstanceInited', getKcInstanceInited);
});