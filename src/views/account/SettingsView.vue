<template>
  <div class="settings-view">
    <div class="settings-header">
      <h1 class="settings-title">Settings</h1>
      <p class="settings-subtitle">Configure app preferences and manage your data</p>
    </div>

    <!-- App Preferences -->
    <section class="app-settings-section">
      <h2 class="section-title">App Preferences</h2>
      <div class="settings-options">
        <div class="setting-item">
          <label class="setting-label">Theme:</label>
          <select v-model="appSettings.theme" class="select-input">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">Units:</label>
          <select v-model="appSettings.units" class="select-input">
            <option value="imperial">Imperial (lbs, oz)</option>
            <option value="metric">Metric (kg, g)</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">Language:</label>
          <select v-model="appSettings.language" class="select-input">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">Default View:</label>
          <select v-model="appSettings.defaultView" class="select-input">
            <option value="overview">Overview</option>
            <option value="fridge">Meal Plan</option>
            <option value="shopping">Shopping List</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Cooking Preferences -->
    <section class="cooking-settings-section">
      <h2 class="section-title">Cooking Preferences</h2>
      <div class="settings-options">
        <div class="setting-item">
          <label class="setting-label">Default Servings:</label>
          <input 
            type="number" 
            v-model="cookingSettings.defaultServings" 
            min="1" 
            max="12" 
            class="number-input"
          />
        </div>
        <div class="setting-item">
          <label class="setting-label">Cooking Skill Level:</label>
          <select v-model="cookingSettings.skillLevel" class="select-input">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div class="setting-item">
          <label class="setting-label">Prep Time Preference:</label>
          <select v-model="cookingSettings.prepTime" class="select-input">
            <option value="quick">Quick (under 30 min)</option>
            <option value="moderate">Moderate (30-60 min)</option>
            <option value="extended">Extended (60+ min)</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Data Management -->
    <section class="data-management-section">
      <h2 class="section-title">Data Management</h2>
      <div class="data-actions">
        <button @click="exportData" class="btn-secondary">Export Data</button>
        <button @click="clearCache" class="btn-secondary">Clear Cache</button>
        <button @click="confirmReset" class="btn-danger">Reset App</button>
      </div>
      
      <div class="storage-info">
        <p class="storage-text">
          <strong>Storage Used:</strong> {{ formatBytes(storageUsed) }}
        </p>
        <p class="storage-text">
          <strong>Last Backup:</strong> {{ formatDate(lastBackup) }}
        </p>
      </div>
    </section>

    <!-- About -->
    <section class="about-section">
      <h2 class="section-title">About</h2>
      <div class="about-content">
        <div class="about-item">
          <span class="about-label">Version:</span>
          <span class="about-value">1.3.2</span>
        </div>
        <div class="about-item">
          <span class="about-label">Build:</span>
          <span class="about-value">{{ buildDate }}</span>
        </div>
        <div class="about-item">
          <span class="about-label">License:</span>
          <span class="about-value">MIT License</span>
        </div>
      </div>
    </section>

    <!-- Save Button -->
    <div class="actions">
      <button @click="saveSettings" class="btn-primary">Save Settings</button>
    </div>

    <!-- Reset Confirmation Modal -->
    <div v-if="showResetModal" class="modal-overlay" @click="cancelReset">
      <div class="modal" @click.stop>
        <h3 class="modal-title">Reset App</h3>
        <p class="modal-message">
          Are you sure you want to reset the app? This will delete all your data including:
        </p>
        <ul class="modal-list">
          <li>Saved meal plans</li>
          <li>Shopping lists</li>
          <li>User preferences</li>
          <li>Notification settings</li>
        </ul>
        <p class="modal-warning">
          <strong>This action cannot be undone!</strong>
        </p>
        <div class="modal-actions">
          <button @click="cancelReset" class="btn-secondary">Cancel</button>
          <button @click="resetApp" class="btn-danger">Reset App</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// App settings state
const appSettings = ref({
  theme: 'auto',
  units: 'imperial',
  language: 'en',
  defaultView: 'overview',
})

// Cooking settings state
const cookingSettings = ref({
  defaultServings: 4,
  skillLevel: 'intermediate',
  prepTime: 'moderate',
})

// Data management
const storageUsed = ref(0)
const lastBackup = ref<Date | null>(null)
const showResetModal = ref(false)

// Computed properties
const buildDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

// Load saved settings on mount
onMounted(() => {
  loadSettings()
  calculateStorageUsage()
  loadLastBackup()
})

const loadSettings = () => {
  const savedApp = localStorage.getItem('appSettings')
  if (savedApp) {
    appSettings.value = { ...appSettings.value, ...JSON.parse(savedApp) }
  }
  
  const savedCooking = localStorage.getItem('cookingSettings')
  if (savedCooking) {
    cookingSettings.value = { ...cookingSettings.value, ...JSON.parse(savedCooking) }
  }
}

const saveSettings = () => {
  localStorage.setItem('appSettings', JSON.stringify(appSettings.value))
  localStorage.setItem('cookingSettings', JSON.stringify(cookingSettings.value))
  alert('Settings saved successfully!')
}

const calculateStorageUsage = () => {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length
    }
  }
  storageUsed.value = total
}

const loadLastBackup = () => {
  const saved = localStorage.getItem('lastBackup')
  if (saved) {
    lastBackup.value = new Date(saved)
  }
}

const exportData = () => {
  const data = {
    appSettings: appSettings.value,
    cookingSettings: cookingSettings.value,
    userProfile: localStorage.getItem('userProfile'),
    notificationSettings: localStorage.getItem('notificationSettings'),
    exportDate: new Date().toISOString(),
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `meal-fit-prep-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  localStorage.setItem('lastBackup', new Date().toISOString())
  lastBackup.value = new Date()
}

const clearCache = () => {
  if (confirm('Clear cache? This will remove temporary data but keep your settings.')) {
    // Clear non-essential data
    const keysToKeep = [
      'appSettings',
      'cookingSettings', 
      'userProfile',
      'notificationSettings',
      'lastBackup'
    ]
    
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && !keysToKeep.includes(key)) {
        keysToRemove.push(key)
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key))
    calculateStorageUsage()
    alert('Cache cleared successfully!')
  }
}

const confirmReset = () => {
  showResetModal.value = true
}

const cancelReset = () => {
  showResetModal.value = false
}

const resetApp = () => {
  localStorage.clear()
  alert('App has been reset. The page will now reload.')
  window.location.reload()
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: Date | null) => {
  if (!date) return 'Never'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.settings-view {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-5);
}

.settings-header {
  margin-bottom: var(--space-8);
}

.settings-title {
  font-size: var(--text-3xl);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-2);
}

.settings-subtitle {
  font-size: var(--text-lg);
  color: var(--muted);
  margin: 0;
}

.app-settings-section,
.cooking-settings-section,
.data-management-section,
.about-section {
  background: var(--paper);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  border: 1px solid var(--rule);
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-4);
}

.settings-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.setting-label {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--ink);
}

.select-input,
.number-input {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  font-size: var(--text-base);
  background: var(--paper);
  color: var(--ink);
  transition: border-color var(--transition);
}

.select-input:focus,
.number-input:focus {
  outline: none;
  border-color: var(--green);
}

.data-actions {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}

.btn-secondary,
.btn-primary,
.btn-danger {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  font-size: var(--text-base);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  border: none;
}

.btn-secondary {
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--rule);
}

.btn-secondary:hover {
  background: var(--rule);
}

.btn-primary {
  background: var(--green);
  color: white;
}

.btn-primary:hover {
  background: color-mix(in srgb, var(--green) 90%, black);
}

.btn-danger {
  background: var(--danger, #dc3545);
  color: white;
}

.btn-danger:hover {
  background: color-mix(in srgb, var(--danger, #dc3545) 90%, black);
}

.storage-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.storage-text {
  font-size: var(--text-sm);
  color: var(--muted);
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.about-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--rule);
}

.about-label {
  font-weight: 500;
  color: var(--ink);
}

.about-value {
  color: var(--muted);
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-6);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
}

.modal {
  background: var(--paper);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-4);
}

.modal-message {
  color: var(--ink);
  margin-bottom: var(--space-4);
  line-height: 1.5;
}

.modal-list {
  margin: var(--space-4) 0;
  padding-left: var(--space-4);
  color: var(--ink);
}

.modal-list li {
  margin-bottom: var(--space-1);
}

.modal-warning {
  color: var(--danger, #dc3545);
  font-weight: 500;
  margin-bottom: var(--space-4);
}

.modal-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .settings-view {
    padding: var(--space-4);
  }
  
  .data-actions {
    flex-direction: column;
  }
  
  .actions {
    justify-content: stretch;
  }
  
  .btn-primary,
  .btn-secondary,
  .btn-danger {
    width: 100%;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal {
    padding: var(--space-4);
  }
}
</style>
