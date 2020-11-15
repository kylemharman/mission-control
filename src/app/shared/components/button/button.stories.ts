import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';

export default {
  title: 'Shared/Button',
  component: ButtonComponent,
  argTypes: {
    borderColor: { control: 'color' },
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  label: 'Full Width Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Large Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: 'Medium Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Small Button',
};
