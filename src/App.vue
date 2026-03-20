<script setup lang="ts">
import { RouterView } from "vue-router";
import AppMasthead from "./components/layout/AppMasthead.vue";
import AppNav from "./components/layout/AppNav.vue";
import AppPage from "./components/layout/AppPage.vue";
</script>

<template>
  <AppMasthead />
  <AppNav />
  <AppPage>
    <RouterView v-slot="{ Component }">
      <Transition name="view" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppPage>
</template>

<style scoped></style>
