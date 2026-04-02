import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Card from '@/components/ui/Card.vue';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Card variant style',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Card border radius',
    },
    interactive: {
      control: 'boolean',
      description: 'Make card interactive',
    },
    hoverable: {
      control: 'boolean',
      description: 'Add hover effects',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the card',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card>
        <h3>Card Title</h3>
        <p>This is a default card with standard styling and padding.</p>
      </Card>
    `,
  }),
};

export const Elevated: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card variant="elevated">
        <h3>Elevated Card</h3>
        <p>This card has more prominent shadow and elevation.</p>
      </Card>
    `,
  }),
};

export const Outlined: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card variant="outlined">
        <h3>Outlined Card</h3>
        <p>This card has a more prominent border and no shadow.</p>
      </Card>
    `,
  }),
};

export const Filled: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card variant="filled">
        <h3>Filled Card</h3>
        <p>This card has a filled background with no border.</p>
      </Card>
    `,
  }),
};

export const WithHeader: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card>
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">Card Header</h3>
            <button style="background: none; border: none; cursor: pointer;">×</button>
          </div>
        </template>
        <p>This card has a header section with custom content.</p>
      </Card>
    `,
  }),
};

export const WithMedia: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card>
        <template #media>
          <img src="https://picsum.photos/400/200" alt="Placeholder image" style="width: 100%; height: 200px; object-fit: cover;" />
        </template>
        <h3>Card with Media</h3>
        <p>This card includes an image in the media slot.</p>
      </Card>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card>
        <h3>Card with Actions</h3>
        <p>This card has action buttons in the footer.</p>
        <template #actions>
          <button style="background: #3b6e4c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Save</button>
          <button style="background: #e5e7eb; color: #374151; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cancel</button>
        </template>
      </Card>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Card interactive hoverable>
          <h3>Interactive Card</h3>
          <p>Click this card to see the interactive effects.</p>
        </Card>
        <Card interactive hoverable>
          <h3>Another Interactive Card</h3>
          <p>Cards can be used for navigation or selection.</p>
        </Card>
      </div>
    `,
  }),
};

export const DifferentSizes: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div style="display: flex; gap: 1rem; align-items: flex-start;">
        <Card padding="sm">
          <h4>Small Padding</h4>
          <p>Compact card with minimal spacing.</p>
        </Card>
        <Card padding="md">
          <h4>Medium Padding</h4>
          <p>Standard card with default spacing.</p>
        </Card>
        <Card padding="lg">
          <h4>Large Padding</h4>
          <p>Spacious card with generous spacing.</p>
        </Card>
      </div>
    `,
  }),
};

export const ComplexCard: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card variant="elevated" hoverable>
        <template #media>
          <img src="https://picsum.photos/400/250" alt="Food placeholder" style="width: 100%; height: 250px; object-fit: cover;" />
        </template>
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="margin: 0;">Recipe Card</h3>
            <span style="background: #dc2626; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">New</span>
          </div>
        </template>
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
          <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">30 min</span>
          <span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Easy</span>
          <span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px;">4 servings</span>
        </div>
        <p style="color: #6b7280; margin-bottom: 1rem;">A delicious and healthy recipe that's perfect for meal prep. Easy to make and stores well in the fridge.</p>
        <template #actions>
          <button style="background: #3b6e4c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">View Recipe</button>
          <button style="background: transparent; color: #3b6e4c; border: 1px solid #3b6e4c; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Save</button>
        </template>
      </Card>
    `,
  }),
};
