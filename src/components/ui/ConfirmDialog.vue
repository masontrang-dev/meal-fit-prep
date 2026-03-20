<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'green' | 'red' | 'blue' | 'gold'
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleCancel()
  }
}

// Trap focus within modal when open
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      @click="handleBackdropClick"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-[var(--ink)] opacity-60"></div>

      <!-- Modal -->
      <div
        class="relative card p-6 max-w-md w-full shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`dialog-title-${title}`"
      >
        <!-- Icon -->
        <div class="flex items-center justify-center mb-4">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            :style="{
              backgroundColor: `var(--${variant || 'green'}-light)`,
              color: `var(--${variant || 'green'})`
            }"
          >
            <template v-if="variant === 'red'">⚠️</template>
            <template v-else>✓</template>
          </div>
        </div>

        <!-- Title -->
        <h3
          :id="`dialog-title-${title}`"
          class="text-xl font-display font-semibold text-[var(--ink)] text-center mb-3"
        >
          {{ title }}
        </h3>

        <!-- Message -->
        <p class="text-sm text-[var(--ink)] text-center leading-relaxed mb-6">
          {{ message }}
        </p>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            @click="handleCancel"
            class="flex-1 px-4 py-2.5 text-sm font-medium rounded border-2 transition-all min-h-[44px]"
            :style="{
              borderColor: 'var(--rule)',
              color: 'var(--muted)',
              backgroundColor: 'transparent'
            }"
            @keydown.tab.shift.exact="$event.preventDefault()"
          >
            {{ cancelText || 'Cancel' }}
          </button>
          <button
            @click="handleConfirm"
            class="flex-1 px-4 py-2.5 text-sm font-medium rounded transition-all min-h-[44px]"
            :style="{
              backgroundColor: `var(--${variant || 'green'})`,
              color: 'white'
            }"
            autofocus
          >
            {{ confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .card,
.modal-leave-active .card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .card,
.modal-leave-to .card {
  transform: scale(0.95);
  opacity: 0;
}
</style>
