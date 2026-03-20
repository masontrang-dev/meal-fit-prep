<script setup lang="ts">
import ServingsSelector from "@/components/ui/ServingsSelector.vue";
</script>

<template>
  <header class="masthead">
    <div class="masthead-inner">
      <div class="masthead-content">
        <div class="masthead-title-section">
          <h1 class="masthead-title">Meal Prep<br /><em class="masthead-subtitle">for Two</em></h1>
          <div class="masthead-pills">
            <span class="pill">6 Lunches + 6 Dinners</span>
            <span class="pill">Whole Foods</span>
            <span class="pill">DASH Friendly</span>
            <span class="pill">Sunday Prep + Wed Cast Iron</span>
          </div>
        </div>
        <div class="masthead-meta">
          Fish · Chicken · Steak<br />
          Brown Rice · Quinoa · Lentils<br />
          2 People · San Diego
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
  margin: 0;
  font-family: "Cormorant Garamond", serif;
  line-height: 1.3;
}

.masthead-subtitle {
  font-style: italic;
  font-weight: 400;
  font-size: 2rem;
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
  text-align: right;
  color: var(--bg);
  font-size: 0.875rem;
  line-height: 1.6;
  opacity: 0.85;
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
