<script setup lang="ts">
import { useRouter } from "vue-router";
import ServingsSelector from "@/components/ui/ServingsSelector.vue";

const router = useRouter();
const version = "1.3.2"; // This will be updated automatically by deployment scripts

function navigateToHome() {
  router.push("/overview");
}
</script>

<template>
  <header class="masthead">
    <div class="masthead-inner">
      <div class="masthead-content">
        <div class="masthead-title-section">
          <button @click="navigateToHome" class="masthead-title-button">
            <h1 class="masthead-title">
              🥗 MealFit<br /><em class="masthead-subtitle">Smart Meal Prep</em>
            </h1>
          </button>
          <div class="masthead-pills">
            <span class="pill">Weekly Meal Plan</span>
            <span class="pill">Whole Ingredients</span>
            <span class="pill">Diet Friendly</span>
            <span class="pill">Flexible Prep</span>
          </div>
        </div>
        <div class="masthead-meta">
          Fish · Chicken · Steak<br />
          Brown Rice · Quinoa · Lentils<br />
          <span style="text-transform: none">v{{ version }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.masthead {
  background: var(--ink);
  color: var(--bg);
  padding: 36px 32px 28px;
  border-bottom: 3px solid var(--green);
}

.masthead-inner {
  max-width: 980px;
  margin: 0 auto;
}

.masthead-content {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 24px;
}

.masthead-title-section {
  flex: 1;
}

.masthead-title-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: left;
  transition: opacity 0.2s;
}

.masthead-title-button:hover {
  opacity: 0.8;
}

.masthead-title {
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.01em;
  margin: 0;
}

.masthead-subtitle {
  font-style: italic;
  color: #a8d4b8;
}

.masthead-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.pill {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.masthead-meta {
  text-align: right;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  line-height: 2.2;
}

@media (max-width: 768px) {
  .masthead {
    padding: 24px 20px;
  }

  .masthead-content {
    grid-template-columns: 1fr;
  }

  .masthead-meta {
    text-align: left;
    margin-top: 12px;
  }
}
</style>
