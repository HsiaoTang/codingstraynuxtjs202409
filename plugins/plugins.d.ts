import Keycloak from 'keycloak-js';

declare module '#app' {
  interface NuxtApp {
    $keycloak: Keycloak;
    $getKcInstance: () => Keycloak;
    $getKcInstanceInited: () => Promise<Keycloak>;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak;
    $getKcInstance: () => Keycloak;
    $getKcInstanceInited: () => Promise<Keycloak>;
  }
}

export {}
