import { useContext } from 'react';

import NotificationContext from 'context/notificationProvider';

const useAlert = () => {
  const { showNotification } = useContext(NotificationContext);
  return { showNotification };
};

export default useAlert;
