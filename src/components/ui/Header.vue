<template>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="header-title">{{ title }}</h1>
      </div>
      
      <div class="header-right">
        <div v-if="user" class="user-menu">
          <span class="user-name">{{ user.name }}</span>
          <Button variant="ghost" size="sm" @click="$emit('logout')">
            Logout
          </Button>
        </div>
        <div v-else class="auth-buttons">
          <Button variant="secondary" size="sm" @click="$emit('login')">
            Login
          </Button>
          <Button variant="primary" size="sm" @click="$emit('create-account')">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui";

interface User {
  name: string;
  email?: string;
}

interface Props {
  title?: string;
  user?: User | null;
}

defineProps<Props>();

defineEmits<{
  login: [];
  logout: [];
  "create-account": [];
}>();
</script>

<style scoped>
.header {
  @apply bg-white border-b border-gray-200;
  @apply shadow-sm;
}

.header-content {
  @apply max-w-7xl mx-auto;
  @apply px-4 sm:px-6 lg:px-8;
  @apply flex items-center justify-between;
  @apply h-16;
}

.header-left {
  @apply flex items-center;
}

.header-title {
  @apply text-xl font-semibold text-gray-900;
  @apply tracking-tight;
}

.header-right {
  @apply flex items-center space-x-4;
}

.user-menu {
  @apply flex items-center space-x-3;
}

.user-name {
  @apply text-sm font-medium text-gray-700;
}

.auth-buttons {
  @apply flex items-center space-x-2;
}

@media (max-width: 640px) {
  .header-content {
    @apply px-4;
  }
  
  .header-title {
    @apply text-lg;
  }
  
  .auth-buttons {
    @apply space-x-1;
  }
  
  .user-menu {
    @apply space-x-2;
  }
}
</style>
