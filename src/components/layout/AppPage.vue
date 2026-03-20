<template>
  <div class="app-page">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-page {
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (max-width: 768px) {
  .app-page {
    padding: 1.5rem 1rem;
  }
}

@media (min-width: 1280px) {
  .app-page {
    padding: 2.5rem 1rem;
  }
}
</style>
