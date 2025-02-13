
import zh_TW from '~/locales/zh_TW.json';
import en from '~/locales/en.json';
import { defineI18nConfig } from '~/node_modules/@nuxtjs/i18n/dist/runtime/composables/index';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  locales: [
    { 'code': 'zh_TW', 'language': 'zh-TW', 'file': 'zh_TW.json' },
    { 'code': 'en', 'language': 'en', 'file': 'en.json' }
  ],
  fallbackLocale: 'zh_TW',
  strategy: 'no_prefix',
  langDir: './locales',
  messages: {
    en, zh_TW
  }
}));