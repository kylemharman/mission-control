import { Meta, Story } from '@storybook/angular';
import { TaskRowNewComponent as TaskRowNew } from './task-row-new.component';

export default {
  title: 'Task/New-Task-Row',
  component: TaskRowNew,
} as Meta;

export const NewTaskRow = () => ({
  component: TaskRowNew,
  props: {
    placeholder: 'place text here',
  },
});
