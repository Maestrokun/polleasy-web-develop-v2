import React from 'react';
import NewUserDrawer from 'modules/Admin/components/NewUserDrawer';
import { LoadingButton } from '@mui/lab';

export default {
  title: 'Admin/NewUserDrawer',
  component: NewUserDrawer,
};

function Template(args) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
  return (
    <>
      <LoadingButton
        disableElevation
        color="primary"
        type="submit"
        variant="contained"
        loading={false}
        onClick={() => setIsDrawerOpen(true)}
        sx={{ marginLeft: '20px', marginRight: '10px' }}
      >
        Add New
      </LoadingButton>
      <NewUserDrawer
        open={isDrawerOpen}
        close={() => setIsDrawerOpen(false)}
        {...args}
      />
      ;
    </>
  );
}

export const AddSingleUser = Template.bind({});
