<template>
  <button :class="buttonClasses" :disabled="disabled || loading" :type="type" v-bind="$attrs">
    <span v-if="loading" class="btn-spinner" aria-hidden="true"></span>
    <span v-if="icon && !loading" :class="iconClasses">
      <Icon :name="icon" />
    </span>
    <span v-if="$slots.default" :class="textClasses">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue'
  import { Icon } from '@/components/icons'

  interface Props {
    variant?:
      | 'primary'
      | 'secondary'
      | 'ghost'
      | 'danger'
      | 'success'
      | 'fish'
      | 'chicken'
      | 'steak'
      | 'cast'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    icon?: string
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    type: 'button',
    fullWidth: false,
  })

  const buttonClasses = computed(() => {
    const classes = ['btn']

    // Variant
    classes.push(`btn-${props.variant}`)

    // Size
    classes.push(`btn-${props.size}`)

    // State
    if (props.disabled) classes.push('btn-disabled')
    if (props.loading) classes.push('btn-loading')
    if (props.fullWidth) classes.push('btn-full-width')

    return classes
  })

  const iconClasses = computed(() => {
    const classes = ['btn-icon']

    if (props.size === 'sm') classes.push('btn-icon-sm')
    else if (props.size === 'lg') classes.push('btn-icon-lg')

    if (useSlots().default) {
      classes.push('btn-icon-with-text')
    }

    return classes
  })

  const textClasses = computed(() => {
    const classes = ['btn-text']

    if (props.icon) {
      classes.push('btn-text-with-icon')
    }

    return classes
  })
</script>

<style scoped>
  .btn {
    @apply inline-flex items-center justify-center;
    @apply font-medium text-sm;
    @apply transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
    @apply border border-transparent;
    @apply rounded-lg;
    min-height: var(--touch-target);
    min-width: var(--touch-target);
    position: relative;
    overflow: hidden;
  }

  .btn:focus-visible {
    @apply focus:ring-green-500;
    box-shadow: var(--focus-ring);
  }

  /* Variants */
  .btn-primary {
    @apply bg-green-600 text-white hover:bg-green-700;
    background-color: var(--green);
    @apply focus:ring-green-500;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--green);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background-color: var(--paper);
    color: var(--ink);
    border: 1px solid var(--rule);
    @apply hover:bg-gray-200 hover:border-gray-400;
    @apply focus:ring-gray-500;
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--bg);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  .btn-ghost {
    color: var(--muted);
    @apply hover:text-gray-900 hover:bg-gray-100;
    @apply focus:ring-gray-500;
    @apply border-transparent;
  }

  .btn-ghost:hover:not(:disabled) {
    color: var(--ink);
    background-color: var(--bg);
  }

  .btn-danger {
    background-color: var(--red);
    color: white;
    @apply focus:ring-red-500;
  }

  .btn-danger:hover:not(:disabled) {
    background-color: var(--red);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-success {
    background-color: var(--green);
    color: white;
    @apply focus:ring-green-500;
  }

  .btn-success:hover:not(:disabled) {
    background-color: var(--green);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-fish {
    background-color: var(--blue);
    color: white;
    @apply focus:ring-blue-500;
  }

  .btn-fish:hover:not(:disabled) {
    background-color: var(--blue);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-chicken {
    background-color: var(--orange);
    color: white;
    @apply focus:ring-orange-500;
  }

  .btn-chicken:hover:not(:disabled) {
    background-color: var(--orange);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-steak {
    background-color: var(--gold);
    color: white;
    @apply focus:ring-yellow-500;
  }

  .btn-steak:hover:not(:disabled) {
    background-color: var(--gold);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn-cast {
    background-color: var(--cast);
    color: white;
    @apply focus:ring-pink-500;
  }

  .btn-cast:hover:not(:disabled) {
    background-color: var(--cast);
    filter: brightness(0.9);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  /* Sizes */
  .btn-sm {
    @apply px-3 py-1.5 text-xs;
    min-height: var(--touch-target-small);
    min-width: var(--touch-target-small);
  }

  .btn-md {
    @apply px-4 py-2 text-sm;
  }

  .btn-lg {
    @apply px-6 py-3 text-base;
    min-height: 48px;
    min-width: 48px;
  }

  /* States */
  .btn-disabled {
    @apply opacity-50 cursor-not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  .btn-loading {
    @apply cursor-wait;
  }

  .btn-full-width {
    @apply w-full;
  }

  /* Icon styles */
  .btn-icon {
    @apply flex-shrink-0;
  }

  .btn-icon-sm {
    @apply w-4 h-4;
  }

  .btn-icon {
    @apply w-5 h-5;
  }

  .btn-icon-lg {
    @apply w-6 h-6;
  }

  .btn-icon-with-text {
    @apply mr-2;
  }

  /* Text styles */
  .btn-text {
    @apply truncate;
  }

  .btn-text-with-icon {
    @apply ml-1;
  }

  /* Spinner */
  .btn-spinner {
    @apply w-4 h-4 mr-2;
    @apply border-2 border-current border-t-transparent;
    @apply rounded-full;
    animation: spin 1s linear infinite;
  }

  .btn-sm .btn-spinner {
    @apply w-3 h-3 mr-1.5;
  }

  .btn-lg .btn-spinner {
    @apply w-5 h-5 mr-3;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Touch feedback */
  .btn:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
    transition: transform 100ms;
  }
</style>
