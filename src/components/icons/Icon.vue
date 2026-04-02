<template>
  <component :is="iconComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import * as Icons from 'lucide-vue-next'

  interface Props {
    name: string
  }

  const props = defineProps<Props>()

  const iconComponent = computed(() => {
    const icon = Icons[props.name as keyof typeof Icons]
    return (icon || Icons['HelpCircle']) as any
  })
</script>
