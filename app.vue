<script setup lang="ts">

const headProps: Record<string, string> = {
  title: 'CodingStray',
  charset: 'UTF-8',
  description: 'Best Blog To Share Your Daily Life',
  viewport: 'width=device-width, initial-scale=1.0',
}

</script>

<template>
  <div>
    <Head>
      <Title>{{ headProps.title }}</Title>
      <Meta :charset="headProps.charset" />
      <Meta name="description" :content="headProps.description" />
      <Meta name="viewport" :content="headProps.viewport" />
    </Head>
    <Body>
      <NuxtLayout />
    </Body>
  </div>
</template>