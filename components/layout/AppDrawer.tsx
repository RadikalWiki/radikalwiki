import {
  Drawer,
} from '@mui/material';
import { AppList } from 'comps';

const AppDrawer = ({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: (val: boolean) => void;
}) => {

  return (
    <Drawer variant="permanent" open={openDrawer} sx={{ border: '1px' }}>
      <AppList />
    </Drawer>
  );
};

export default AppDrawer;
