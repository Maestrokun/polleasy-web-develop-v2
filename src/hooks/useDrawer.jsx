import { useContext } from 'react';

import { DrawerContext } from 'context/drawerContext';

const useDrawer = () => {
  const { state, setState } = useContext(DrawerContext);

  return [state, setState];
};

export default useDrawer;
