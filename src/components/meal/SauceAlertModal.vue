<script setup lang="ts">
const props = defineProps<{
  sauceName: string
  instructions: string
  phase2DurationMin: number
}>()

const emit = defineEmits<{
  'confirm': []
  'skip': []
}>()
</script>

<template>
  <div class="modal-overlay" @click.self="emit('skip')">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-icon">🔴</div>
        <h2 class="modal-title">Time to apply the sauce!</h2>
      </div>
      
      <div class="modal-body">
        <div class="sauce-name">{{ sauceName }}</div>
        <p class="sauce-instructions">{{ instructions }}</p>
        <p class="sauce-timing">Close oven — {{ phase2DurationMin }} minutes remaining.</p>
      </div>
      
      <div class="modal-actions">
        <button @click="emit('confirm')" class="btn-confirm">
          ✓ Done — Start {{ phase2DurationMin }} min final timer
        </button>
        <button @click="emit('skip')" class="btn-skip">
          Skip sauce
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--paper);
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  text-align: center;
  padding: 32px 24px 16px;
  border-bottom: 2px solid var(--rule);
}

.modal-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--red);
  margin: 0;
}

.modal-body {
  padding: 24px;
}

.sauce-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 12px;
}

.sauce-instructions {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ink);
  margin: 0 0 12px 0;
}

.sauce-timing {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--orange);
  margin: 0;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 24px 24px;
}

.btn-confirm,
.btn-skip {
  padding: 14px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirm {
  background: var(--green);
  color: white;
}

.btn-confirm:hover {
  background: #2d5a3c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 110, 76, 0.3);
}

.btn-skip {
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--rule);
}

.btn-skip:hover {
  background: var(--rule);
}
</style>
