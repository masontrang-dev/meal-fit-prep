<script setup lang="ts">
import ServingsSelector from "@/components/ui/ServingsSelector.vue";
</script>

<template>
  <header class="masthead">
    <div class="masthead-inner">
      <div class="masthead-content">
        <div class="masthead-title-section">
          <h1 class="masthead-title">Meal Prep <span class="masthead-subtitle">for Two</span></h1>
          <div class="masthead-pills">
            <span class="pill">6 Lunches + 6 Dinners</span>
            <span class="pill">Whole Foods</span>
            <span class="pill">Sunday Prep</span>
            <span class="pill">DASH-Aligned</span>
          </div>
        </div>
        <div class="masthead-meta">
          <ServingsSelector />
          <div class="meta-row">
            <span class="meta-label">Proteins:</span>
            <span class="meta-value">Fish, Chicken, Steak</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Grains:</span>
            <span class="meta-value">Brown Rice, Quinoa, Jasmine</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Location:</span>
            <span class="meta-value">Fridge + Pantry</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.masthead {
  background: var(--ink);
  border-bottom: 3px solid var(--green);
  padding: 1.5rem 1rem;
}

.masthead-inner {
  max-width: 980px;
  margin: 0 auto;
}

.masthead-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.masthead-title-section {
  flex: 1;
}

.masthead-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--bg);
  margin: 0 0 0.75rem 0;
  line-height: 1.1;
}

.masthead-subtitle {
  font-style: italic;
  font-weight: 600;
  color: var(--green-mid);
}

.masthead-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.pill {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: var(--bg);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.masthead-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 240px;
}

.meta-row {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.meta-label {
  color: var(--muted);
  font-weight: 600;
  min-width: 70px;
}

.meta-value {
  color: var(--bg);
  font-weight: 300;
}

@media (max-width: 768px) {
  .masthead {
    padding: 1.25rem 1rem;
  }

  .masthead-content {
    flex-direction: column;
    gap: 1rem;
  }

  .masthead-title {
    font-size: 1.75rem;
  }

  .masthead-meta {
    display: none;
  }
}
</style>
