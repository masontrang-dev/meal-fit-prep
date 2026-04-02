<template>
  <article>
    <Header
      :user="user"
      title="Meal Fit Prep"
      @login="onLogin"
      @logout="onLogout"
      @create-account="onCreateAccount"
    />

    <section class="storybook-page">
      <Card variant="elevated" class="page-card">
        <template #header>
          <h2>Component Library Showcase</h2>
        </template>

        <div class="component-section">
          <h3>Buttons</h3>
          <div class="button-showcase">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
        </div>

        <div class="component-section">
          <h3>Cards</h3>
          <div class="card-showcase">
            <Card variant="default" class="showcase-card">
              <h4>Default Card</h4>
              <p>Standard card with default styling.</p>
            </Card>
            <Card variant="elevated" class="showcase-card">
              <h4>Elevated Card</h4>
              <p>Card with more prominent shadow.</p>
            </Card>
            <Card variant="outlined" class="showcase-card">
              <h4>Outlined Card</h4>
              <p>Card with prominent border.</p>
            </Card>
          </div>
        </div>

        <div class="component-section">
          <h3>Interactive Examples</h3>
          <div class="interactive-showcase">
            <Card interactive hoverable class="interactive-card">
              <h4>Interactive Card</h4>
              <p>Click this card to see interactive effects.</p>
              <template #actions>
                <Button variant="primary" size="sm">Learn More</Button>
              </template>
            </Card>

            <div class="loading-demo">
              <h4>Loading States</h4>
              <Button variant="primary" :loading="isLoading" @click="toggleLoading">
                {{ isLoading ? 'Loading...' : 'Click to Load' }}
              </Button>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Component-Driven Development</h3>
          <p>
            We recommend building UIs with a
            <a href="https://componentdriven.org" target="_blank" rel="noopener noreferrer">
              <strong>component-driven</strong>
            </a>
            process starting with atomic components and ending with pages.
          </p>
          <p>
            Render pages with mock data. This makes it easy to build and review page states without
            needing to navigate to them in your app. Here are some handy patterns for managing page
            data in Storybook:
          </p>
          <ul>
            <li>
              Use a higher-level connected component. Storybook helps you compose such data from the
              "args" of child component stories
            </li>
            <li>
              Assemble data in the page component from your services. You can mock these services
              out using Storybook.
            </li>
          </ul>
          <p>
            Get a guided tutorial on component-driven development at
            <a href="https://storybook.js.org/tutorials/" target="_blank" rel="noopener noreferrer"
              >Storybook tutorials</a
            >
            . Read more in the
            <a href="https://storybook.js.org/docs" target="_blank" rel="noopener noreferrer"
              >docs</a
            >
            .
          </p>
          <div class="tip-wrapper">
            <span class="tip">Tip</span>
            Adjust the width of the canvas with the
            <svg width="10" height="10" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path
                  d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                  id="a"
                  fill="#999"
                />
              </g>
            </svg>
            Viewports addon in the toolbar
          </div>
        </div>
      </Card>
    </section>
  </article>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Header, Button, Card } from '@/components/ui'

  interface User {
    name: string
    email: string
  }

  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const onLogin = () => {
    user.value = { name: 'John Doe', email: 'john@example.com' }
  }

  const onLogout = () => {
    user.value = null
  }

  const onCreateAccount = () => {
    console.log('Create account clicked')
  }

  const toggleLoading = () => {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
</script>

<style scoped>
  .storybook-page {
    @apply p-6;
    @apply max-w-4xl mx-auto;
  }

  .page-card {
    @apply mb-8;
  }

  .component-section {
    @apply mb-8;
  }

  .component-section h3 {
    @apply text-lg font-semibold mb-4;
    @apply text-gray-900;
  }

  .button-showcase {
    @apply flex flex-wrap gap-3;
    @apply mb-6;
  }

  .card-showcase {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4;
    @apply mb-6;
  }

  .showcase-card {
    @apply h-full;
  }

  .showcase-card h4 {
    @apply text-base font-medium mb-2;
    @apply text-gray-900;
  }

  .showcase-card p {
    @apply text-sm text-gray-600;
  }

  .interactive-showcase {
    @apply space-y-6;
  }

  .interactive-card {
    @apply max-w-md;
  }

  .interactive-card h4 {
    @apply text-base font-medium mb-2;
    @apply text-gray-900;
  }

  .interactive-card p {
    @apply text-sm text-gray-600 mb-4;
  }

  .loading-demo {
    @apply space-y-2;
  }

  .loading-demo h4 {
    @apply text-base font-medium;
    @apply text-gray-900;
  }

  .info-section {
    @apply space-y-4;
    @apply text-gray-700;
  }

  .info-section h3 {
    @apply text-lg font-semibold;
    @apply text-gray-900;
  }

  .info-section a {
    @apply text-green-600 hover:text-green-700;
    @apply underline;
  }

  .info-section ul {
    @apply list-disc list-inside;
    @apply space-y-1;
  }

  .tip-wrapper {
    @apply flex items-center gap-2;
    @apply p-4 bg-green-50 border border-green-200 rounded-lg;
    @apply mt-6;
  }

  .tip {
    @apply bg-green-600 text-white;
    @apply px-2 py-1 rounded text-xs font-semibold;
    @apply uppercase tracking-wide;
  }
</style>
