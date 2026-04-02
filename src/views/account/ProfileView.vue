<template>
  <div class="profile-view">
    <div class="profile-header">
      <h1 class="profile-title">Profile</h1>
      <p class="profile-subtitle">Manage your preferences and meal customization</p>
    </div>

    <!-- User Preferences -->
    <section class="preferences-section">
      <h2 class="section-title">Dietary Preferences</h2>
      <div class="preference-options">
        <label class="preference-item">
          <input type="checkbox" v-model="preferences.vegetarian" />
          <span class="preference-label">Vegetarian</span>
        </label>
        <label class="preference-item">
          <input type="checkbox" v-model="preferences.glutenFree" />
          <span class="preference-label">Gluten-Free</span>
        </label>
        <label class="preference-item">
          <input type="checkbox" v-model="preferences.dairyFree" />
          <span class="preference-label">Dairy-Free</span>
        </label>
        <label class="preference-item">
          <input type="checkbox" v-model="preferences.nutFree" />
          <span class="preference-label">Nut-Free</span>
        </label>
        <label class="preference-item">
          <input type="checkbox" v-model="preferences.keto" />
          <span class="preference-label">Keto</span>
        </label>
      </div>
    </section>

    <!-- Meal Customization -->
    <section class="meal-customization-section">
      <h2 class="section-title">Meal Customization</h2>
      <div class="customization-options">
        <div class="servings-control">
          <label class="control-label">Default Servings:</label>
          <input 
            type="number" 
            v-model="defaultServings" 
            min="1" 
            max="12" 
            class="number-input"
          />
        </div>
        <div class="prep-style">
          <label class="control-label">Prep Style:</label>
          <select v-model="prepStyle" class="select-input">
            <option value="minimal">Minimal Prep</option>
            <option value="balanced">Balanced Prep</option>
            <option value="comprehensive">Comprehensive Prep</option>
          </select>
        </div>
        <div class="protein-preference">
          <label class="control-label">Protein Preference:</label>
          <select v-model="proteinPreference" class="select-input">
            <option value="mixed">Mixed Proteins</option>
            <option value="chicken-only">Chicken Only</option>
            <option value="fish-only">Fish Only</option>
            <option value="plant-based">Plant-Based</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Save Button -->
    <div class="actions">
      <button @click="saveProfile" class="btn-primary">Save Preferences</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// User preferences state
const preferences = ref({
  vegetarian: false,
  glutenFree: false,
  dairyFree: false,
  nutFree: false,
  keto: false,
})

const defaultServings = ref(4)
const prepStyle = ref('balanced')
const proteinPreference = ref('mixed')

// Load saved preferences on mount
onMounted(() => {
  const saved = localStorage.getItem('userProfile')
  if (saved) {
    const data = JSON.parse(saved)
    preferences.value = { ...preferences.value, ...data.preferences }
    defaultServings.value = data.defaultServings || 4
    prepStyle.value = data.prepStyle || 'balanced'
    proteinPreference.value = data.proteinPreference || 'mixed'
  }
})

// Save profile to localStorage
const saveProfile = () => {
  const profileData = {
    preferences: preferences.value,
    defaultServings: defaultServings.value,
    prepStyle: prepStyle.value,
    proteinPreference: proteinPreference.value,
  }
  localStorage.setItem('userProfile', JSON.stringify(profileData))
  
  // Show success message (in a real app, you'd use a toast/notification system)
  alert('Profile saved successfully!')
}
</script>

<style scoped>
.profile-view {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-5);
}

.profile-header {
  margin-bottom: var(--space-8);
}

.profile-title {
  font-size: var(--text-3xl);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-2);
}

.profile-subtitle {
  font-size: var(--text-lg);
  color: var(--muted);
  margin: 0;
}

.preferences-section,
.meal-customization-section {
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

.preference-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-3);
}

.preference-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius);
  transition: background-color var(--transition);
}

.preference-item:hover {
  background-color: var(--bg);
}

.preference-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--green);
}

.preference-label {
  font-size: var(--text-base);
  color: var(--ink);
  font-weight: 500;
}

.customization-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.servings-control,
.prep-style,
.protein-preference {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.control-label {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--ink);
}

.number-input,
.select-input {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  font-size: var(--text-base);
  background: var(--paper);
  color: var(--ink);
  transition: border-color var(--transition);
}

.number-input:focus,
.select-input:focus {
  outline: none;
  border-color: var(--green);
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-6);
}

.btn-primary {
  background: var(--green);
  color: white;
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius);
  font-size: var(--text-base);
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition);
}

.btn-primary:hover {
  background: color-mix(in srgb, var(--green) 90%, black);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .profile-view {
    padding: var(--space-4);
  }
  
  .preference-options {
    grid-template-columns: 1fr;
  }
  
  .actions {
    justify-content: stretch;
  }
  
  .btn-primary {
    width: 100%;
  }
}
</style>
