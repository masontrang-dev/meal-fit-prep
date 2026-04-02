<template>
  <div
    :class="cardClasses"
    :role="interactive ? 'button' : undefined"
    :tabindex="interactive ? 0 : undefined"
    :aria-pressed="interactive && pressed ? 'true' : undefined"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="$slots.media" class="card-media">
      <slot name="media" />
    </div>

    <div class="card-content">
      <slot />
    </div>

    <div v-if="$slots.actions" class="card-actions">
      <slot name="actions" />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  interface Props {
    variant?: 'default' | 'elevated' | 'outlined' | 'filled'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    interactive?: boolean
    hoverable?: boolean
    pressed?: boolean
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    padding: 'md',
    rounded: 'md',
    interactive: false,
    hoverable: false,
    pressed: false,
    disabled: false,
  })

  const emit = defineEmits<{
    click: [event: MouseEvent]
    keydown: [event: KeyboardEvent]
  }>()

  const isPressed = ref(props.pressed)

  const cardClasses = computed(() => {
    const classes = ['card']

    // Variant
    classes.push(`card-${props.variant}`)

    // Padding
    if (props.padding !== 'md') {
      classes.push(`card-padding-${props.padding}`)
    }

    // Rounded
    classes.push(`card-rounded-${props.rounded}`)

    // Interactive states
    if (props.interactive) classes.push('card-interactive')
    if (props.hoverable) classes.push('card-hoverable')
    if (props.disabled) classes.push('card-disabled')
    if (isPressed.value) classes.push('card-pressed')

    return classes
  })

  const handleClick = (event: MouseEvent) => {
    if (props.disabled || !props.interactive) return

    if (props.pressed !== undefined) {
      isPressed.value = !isPressed.value
    }

    emit('click', event)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (props.disabled || !props.interactive) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event as any)
    }

    emit('keydown', event)
  }
</script>

<style scoped>
  .card {
    @apply bg-white border border-gray-200;
    @apply transition-all duration-200;
    @apply focus:outline-none;
    position: relative;
    overflow: hidden;
  }

  /* Variants */
  .card-default {
    background-color: var(--paper);
    border: 1px solid var(--rule);
    box-shadow: var(--shadow-sm);
  }

  .card-elevated {
    background-color: var(--paper);
    border: 1px solid var(--rule);
    box-shadow: var(--shadow-md);
  }

  .card-outlined {
    background-color: var(--paper);
    border: 1px solid var(--rule);
    box-shadow: none;
  }

  .card-filled {
    background-color: var(--bg);
    border: 1px solid var(--rule);
    box-shadow: none;
  }

  /* Padding */
  .card-padding-none {
    padding: 0;
  }

  .card-padding-sm {
    padding: var(--space-3);
  }

  .card-padding-md {
    padding: var(--space-5);
  }

  .card-padding-lg {
    padding: var(--space-8);
  }

  /* Rounded */
  .card-rounded-none {
    @apply rounded-none;
  }

  .card-rounded-sm {
    @apply rounded-sm;
  }

  .card-rounded-md {
    @apply rounded-lg;
  }

  .card-rounded-lg {
    @apply rounded-xl;
  }

  .card-rounded-xl {
    @apply rounded-2xl;
  }

  /* Interactive states */
  .card-interactive {
    @apply cursor-pointer;
  }

  .card-interactive:focus-visible {
    @apply ring-2 ring-green-500 ring-offset-2;
    box-shadow: var(--focus-ring);
  }

  .card-hoverable:hover:not(.card-disabled) {
    @apply border-gray-300;
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .card-hoverable:active:not(.card-disabled) {
    transform: translateY(0) scale(0.98);
    transition: transform 100ms;
  }

  .card-pressed {
    @apply border-gray-400;
    box-shadow: var(--shadow-sm);
    transform: translateY(0) scale(0.98);
  }

  .card-disabled {
    @apply opacity-50 cursor-not-allowed;
    transform: none !important;
    box-shadow: var(--shadow-sm) !important;
  }

  /* Card sections */
  .card-header {
    @apply px-6 py-4 border-b border-gray-200;
    @apply bg-gray-50;
  }

  .card-media {
    @apply relative;
    @apply overflow-hidden;
  }

  .card-media img {
    @apply w-full h-full object-cover;
    @apply transition-transform duration-300;
  }

  .card-hoverable:hover .card-media img {
    transform: scale(1.05);
  }

  .card-content {
    @apply px-6 py-4;
  }

  .card-padding-sm .card-content {
    @apply px-3 py-3;
  }

  .card-padding-lg .card-content {
    @apply px-8 py-6;
  }

  .card-actions {
    @apply px-6 py-4 border-t border-gray-200;
    @apply bg-gray-50;
    @apply flex items-center justify-between;
  }

  .card-footer {
    @apply px-6 py-3 border-t border-gray-100;
    @apply bg-gray-50 text-sm text-gray-500;
  }

  /* Loading state */
  .card-loading {
    @apply pointer-events-none;
  }

  .card-loading::before {
    content: '';
    @apply absolute inset-0 bg-white bg-opacity-70;
    z-index: 10;
  }

  /* Badge overlay */
  .card-badge {
    @apply absolute top-3 right-3;
    @apply px-2 py-1 text-xs font-semibold;
    @apply bg-green-100 text-green-800;
    @apply rounded-full;
    z-index: 5;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .card-padding-lg {
      padding: var(--space-6);
    }

    .card-content,
    .card-header,
    .card-actions,
    .card-footer {
      @apply px-4;
    }

    .card-content,
    .card-header,
    .card-actions {
      @apply py-3;
    }
  }
</style>
