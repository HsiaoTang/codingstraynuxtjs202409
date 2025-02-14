import Keycloak from 'keycloak-js';

declare module '#app' {
  interface NuxtApp {
    $keycloak: Keycloak;
    $getKcInstance: () => Keycloak;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak;
    $getKcInstance: () => Keycloak;
  }
}

export {}
