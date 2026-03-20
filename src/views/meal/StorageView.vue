<script setup lang="ts">
import { storageGuide } from '@/data/storageGuide'
import StorageGuide from '@/components/meal/StorageGuide.vue'
import CalloutBox from '@/components/ui/CalloutBox.vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Storage & Reheating</h2>
      <p class="text-muted mt-2">Keep your meal prep fresh and safe</p>
    </div>

    <CalloutBox variant="blue">
      <p><strong>Food Safety:</strong> All fridge life windows assume proper refrigeration at 40°F or below. When in doubt, throw it out. Trust your senses — if it smells off or looks questionable, don't eat it.</p>
    </CalloutBox>

    <section>
      <StorageGuide :items="storageGuide" />
    </section>

    <CalloutBox variant="green">
      <p><strong>Recommended Containers:</strong> Use glass or BPA-free plastic containers with tight-sealing lids. Glass is microwave-safe and doesn't retain odors. Label containers with prep date for easy tracking.</p>
    </CalloutBox>
  </div>
</template>
