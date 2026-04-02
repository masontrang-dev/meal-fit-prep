import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Header from '@/components/ui/Header.vue';

const meta = {
  title: 'UI/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title',
    },
    user: {
      control: 'object',
      description: 'User information',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Meal Fit Prep',
  },
  render: (args) => ({
    components: { Header },
    setup() {
      return { args };
    },
    template: '<Header v-bind="args" />',
  }),
};

export const WithUser: Story = {
  args: {
    title: 'Meal Fit Prep',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
  render: (args) => ({
    components: { Header },
    setup() {
      const handleLogin = () => console.log('Login clicked');
      const handleLogout = () => console.log('Logout clicked');
      const handleCreateAccount = () => console.log('Create account clicked');
      
      return { 
        args, 
        handleLogin, 
        handleLogout, 
        handleCreateAccount 
      };
    },
    template: `
      <Header 
        v-bind="args" 
        @login="handleLogin"
        @logout="handleLogout"
        @create-account="handleCreateAccount"
      />
    `,
  }),
};

export const Mobile: Story = {
  args: {
    title: 'Meal Fit Prep',
  },
  render: (args) => ({
    components: { Header },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 640px;">
        <Header v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};
