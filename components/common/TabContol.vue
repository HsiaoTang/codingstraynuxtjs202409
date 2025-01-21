<template>
  <div class="pt-16 bg-green-50 max-w-fit">
    <ul class="flex bg-green-600 rounded-full shadow-inner">
      <li  v-for="number in [1, 2, 3]">
        <button :class="['bg-green-200 shadow-sm outline outline-1 ml-[-2px] w-12 rounded-full',

        ]">
          {{ number }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

</script>