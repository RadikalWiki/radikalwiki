import { Drawer } from '@mui/material';
import { AppList } from 'comps';
import { Suspense } from 'react';

const AppDrawer = ({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
}) => {
  return (
    <Drawer variant="permanent" open={openDrawer} sx={{ border: '1px' }}>
      <Suspense>
        <AppList />
      </Suspense>
    </Drawer>
  );
};

export default AppDrawer;
