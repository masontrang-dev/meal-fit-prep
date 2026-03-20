<script setup lang="ts">
import CalloutBox from '@/components/ui/CalloutBox.vue'
</script>

<template>
  <div class="space-y-6">
    <CalloutBox variant="cast">
      <strong>🍳 Steak always uses cast iron.</strong> This is non-negotiable for proper crust and
      flavor development.
    </CalloutBox>

    <div class="card">
      <h3 class="text-lg font-display font-semibold text-[var(--ink)] mb-4">
        Sunday Setup (5 min)
      </h3>
      <ol class="space-y-3 text-sm text-[var(--ink)]">
        <li class="flex items-start">
          <span class="font-semibold mr-2">1.</span>
          <span
            >Place <strong>cast iron skillet</strong> on stovetop (don't heat yet).</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">2.</span>
          <span
            >Add a <strong>thin layer of oil</strong> (vegetable or canola, not olive).</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">3.</span>
          <span>Heat on <strong>medium</strong> for 2 minutes.</span>
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">4.</span>
          <span>Wipe out excess oil with paper towel.</span>
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">5.</span>
          <span>Store covered until Wednesday. This pre-seasons the pan.</span>
        </li>
      </ol>
    </div>

    <div class="card">
      <h3 class="text-lg font-display font-semibold text-[var(--ink)] mb-4">
        Wednesday Cooking (13 min)
      </h3>
      <ol class="space-y-3 text-sm text-[var(--ink)]">
        <li class="flex items-start">
          <span class="font-semibold mr-2">1.</span>
          <span
            >Remove steak from fridge <strong>30 min before cooking</strong> (room temp).</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">2.</span>
          <span>Pat steak dry with paper towels. Season generously with salt and pepper.</span>
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">3.</span>
          <span
            >Heat cast iron on <strong>high</strong> for 3 minutes (until smoking hot).</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">4.</span>
          <span
            >Add steak. <strong>Do not move it.</strong> Sear 3–4 min per side for
            medium-rare.</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">5.</span>
          <span
            >Optional: Add butter, garlic, and thyme in last minute. Baste with spoon.</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">6.</span>
          <span
            >Remove steak, <strong>rest 5 minutes</strong> on cutting board. Slice against the
            grain.</span
          >
        </li>
        <li class="flex items-start">
          <span class="font-semibold mr-2">7.</span>
          <span
            >Save half for Thursday lunch. Store sliced steak in airtight container in
            fridge.</span
          >
        </li>
      </ol>
    </div>
  </div>
</template>
