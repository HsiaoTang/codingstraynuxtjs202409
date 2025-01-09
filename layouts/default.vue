<template>
  <div>
    <Navbar />
    <main class="my-16">
      <TestComp />
      <NuxtPage />
    </main>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import TestComp from '~/components/common/TestComp.vue';
import Navbar from '~/components/common/Navbar.vue';
import Footer from '~/components/common/Footer.vue';
</script>