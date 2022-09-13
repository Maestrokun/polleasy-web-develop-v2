import React from 'react';

import { Button } from 'shared';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    handleClick: { action: 'clicked' },
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'secondary', 'success', 'error'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
};

function Template(args) {
  return <Button {...args} />;
}

export const Primary = Template.bind({});

export const Secondary = Template.bind({});

Primary.args = {
  variant: 'contained',
  color: 'primary',
  disableElevation: true,
  fullWidth: false,
  disabled: false,
  size: 'small',
  children: 'Click me',
};

Secondary.args = {
  variant: 'contained',
  color: 'secondary',
  disableElevation: true,
  fullWidth: false,
  disabled: false,
  size: 'small',
  children: 'Click me',
};
