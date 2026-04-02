<template>
  <div class="notifications-view">
    <div class="notifications-header">
      <h1 class="notifications-title">Notifications</h1>
      <p class="notifications-subtitle">Manage your notification preferences and view recent activity</p>
    </div>

    <!-- Notification Settings -->
    <section class="notification-settings-section">
      <h2 class="section-title">Notification Preferences</h2>
      <div class="notification-options">
        <label class="notification-item">
          <input type="checkbox" v-model="settings.prepReminders" />
          <div class="notification-content">
            <span class="notification-label">Sunday Prep Reminders</span>
            <span class="notification-description">Get reminded about weekly meal prep</span>
          </div>
        </label>
        <label class="notification-item">
          <input type="checkbox" v-model="settings.shoppingAlerts" />
          <div class="notification-content">
            <span class="notification-label">Shopping List Updates</span>
            <span class="notification-description">Notifications when shopping list changes</span>
          </div>
        </label>
        <label class="notification-item">
          <input type="checkbox" v-model="settings.achievements" />
          <div class="notification-content">
            <span class="notification-label">Achievement Unlocked</span>
            <span class="notification-description">Celebrate your meal prep milestones</span>
          </div>
        </label>
        <label class="notification-item">
          <input type="checkbox" v-model="settings.newRecipes" />
          <div class="notification-content">
            <span class="notification-label">New Recipes Available</span>
            <span class="notification-description">Discover new sauces and meal ideas</span>
          </div>
        </label>
        <label class="notification-item">
          <input type="checkbox" v-model="settings.weeklySummary" />
          <div class="notification-content">
            <span class="notification-label">Weekly Summary</span>
            <span class="notification-description">Review your meal prep progress</span>
          </div>
        </label>
      </div>
    </section>

    <!-- Recent Notifications -->
    <section class="recent-notifications-section">
      <h2 class="section-title">Recent Activity</h2>
      <div class="notification-list">
        <div
          v-for="notification in recentNotifications"
          :key="notification.id"
          class="notification-item-card"
          :class="notification.type"
        >
          <div class="notification-icon">
            <component :is="notification.icon" />
          </div>
          <div class="notification-info">
            <p class="notification-text">{{ notification.message }}</p>
            <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
          </div>
          <button 
            v-if="notification.dismissible"
            @click="dismissNotification(notification.id)"
            class="dismiss-button"
            aria-label="Dismiss notification"
          >
            <X />
          </button>
        </div>
      </div>
      
      <div v-if="recentNotifications.length === 0" class="empty-state">
        <p>No recent notifications</p>
      </div>
    </section>

    <!-- Save Button -->
    <div class="actions">
      <button @click="saveSettings" class="btn-primary">Save Settings</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bell, Trophy, ShoppingCart, BookOpen, TrendingUp, X } from 'lucide-vue-next'

// Notification settings state
const settings = ref({
  prepReminders: true,
  shoppingAlerts: true,
  achievements: true,
  newRecipes: false,
  weeklySummary: false,
})

// Recent notifications
const recentNotifications = ref([
  {
    id: 1,
    type: 'prep',
    icon: Bell,
    message: 'Sunday prep reminder: Complete your meal planning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    dismissible: true,
  },
  {
    id: 2,
    type: 'achievement',
    icon: Trophy,
    message: 'Achievement unlocked: 4 weeks of consistent meal prep!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    dismissible: true,
  },
  {
    id: 3,
    type: 'shopping',
    icon: ShoppingCart,
    message: 'Shopping list updated with new ingredients',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    dismissible: true,
  },
  {
    id: 4,
    type: 'recipe',
    icon: BookOpen,
    message: 'New chimichurri recipe available',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    dismissible: true,
  },
  {
    id: 5,
    type: 'summary',
    icon: TrendingUp,
    message: 'Weekly summary: You saved 8 hours this week!',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    dismissible: true,
  },
])

// Load saved settings on mount
onMounted(() => {
  const saved = localStorage.getItem('notificationSettings')
  if (saved) {
    settings.value = { ...settings.value, ...JSON.parse(saved) }
  }
})

// Save settings to localStorage
const saveSettings = () => {
  localStorage.setItem('notificationSettings', JSON.stringify(settings.value))
  alert('Notification settings saved successfully!')
}

// Dismiss notification
const dismissNotification = (id: number) => {
  const index = recentNotifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    recentNotifications.value.splice(index, 1)
  }
}

// Format timestamp
const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}
</script>

<style scoped>
.notifications-view {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-5);
}

.notifications-header {
  margin-bottom: var(--space-8);
}

.notifications-title {
  font-size: var(--text-3xl);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: var(--space-2);
}

.notifications-subtitle {
  font-size: var(--text-lg);
  color: var(--muted);
  margin: 0;
}

.notification-settings-section,
.recent-notifications-section {
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

.notification-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  cursor: pointer;
  padding: var(--space-3);
  border-radius: var(--radius);
  transition: background-color var(--transition);
}

.notification-item:hover {
  background-color: var(--bg);
}

.notification-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--green);
  margin-top: 2px;
  flex-shrink: 0;
}

.notification-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.notification-label {
  font-size: var(--text-base);
  color: var(--ink);
  font-weight: 500;
}

.notification-description {
  font-size: var(--text-sm);
  color: var(--muted);
  line-height: 1.4;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.notification-item-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius);
  border: 1px solid var(--rule);
  transition: all var(--transition);
}

.notification-item-card:hover {
  border-color: var(--green);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.notification-icon {
  width: 24px;
  height: 24px;
  color: var(--green);
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.notification-text {
  font-size: var(--text-base);
  color: var(--ink);
  margin: 0;
  line-height: 1.4;
}

.notification-time {
  font-size: var(--text-sm);
  color: var(--muted);
}

.dismiss-button {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius);
  transition: all var(--transition);
  flex-shrink: 0;
}

.dismiss-button:hover {
  color: var(--ink);
  background-color: var(--bg);
}

.empty-state {
  text-align: center;
  padding: var(--space-8);
  color: var(--muted);
  font-size: var(--text-lg);
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
  .notifications-view {
    padding: var(--space-4);
  }
  
  .actions {
    justify-content: stretch;
  }
  
  .btn-primary {
    width: 100%;
  }
  
  .notification-item-card {
    padding: var(--space-3);
  }
}
</style>
