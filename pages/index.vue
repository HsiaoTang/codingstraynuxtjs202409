<template>
  <TabContol :tabFuncs="tabFuncs"/>
</template>

<script setup lang="ts">
import { definePageMeta } from '~/node_modules/nuxt/dist/pages/runtime/composables';
import { LatestSvg, PopularSvg, TopicsSvg } from '~/assets/icons';
import { TabContol, TopicGrids, PopularGrids, LatestGrids } from '~/components/common';

definePageMeta({ layout: 'entrypoint', middleware: 'auth' });

const tabFuncs = [
  {
    title: 'topics',
    icon: TopicsSvg,
    component: TopicGrids,
    content: {
      topicGridPropsArray: [
        {
          title: 'art',
          url: '/imgs/topics/artPic.jpg',
        },
        {
          title: 'coding',
          url: '/imgs/topics/codingPic.jpg',
        },
        {
          title: 'music',
          url: '/imgs/topics/musicPic.jpg',
        },
        {
          title: 'nature',
          url: '/imgs/topics/naturePic.jpg',
        },
        {
          title: 'politics',
          url: '/imgs/topics/politicsPic.jpg',
        },
        {
          title: 'sport',
          url: '/imgs/topics/sportPic.jpg',
        }
      ]
    }
  },
  {
    title: 'popular',
    icon: PopularSvg,
    component: PopularGrids,
    content: {
      popularArticleArray: [
        {
          author: '',
          title: '',
          dateTime: '',
          
        },
        {

        },
        {

        },
        {

        },
        {
          
        },
        {

        },
        {

        },
        {

        },
        {

        },
        {

        },
      ]
    }
  },
  {
    title: 'latest',
    icon: LatestSvg,
    component: LatestGrids,
    content: []
  },
];

</script>