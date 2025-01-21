import Keycloak from 'keycloak-js';

declare module '#app' {
  interface NuxtApp {
    $getKcInstance: () => Keycloak;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $getKcInstance: () => Keycloak;
  }
}

export {};
