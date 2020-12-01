import { Story, Meta } from '@storybook/angular/types-6-0';
import { ToggleComponent } from './toggle.component';

export default {
  title: 'Shared/Toggle',
  component: ToggleComponent,
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
} as Meta;

const Template: Story<ToggleComponent> = (args: ToggleComponent) => ({
  component: ToggleComponent,
  props: args,
});

export const ToggleSmall = Template.bind({});
ToggleSmall.args = {
  on: true,
  size: 'small',
};

export const ToggleLarge = Template.bind({});
ToggleLarge.args = {
  on: false,
  size: 'large',
};
