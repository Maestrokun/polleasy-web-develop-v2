import { useContext } from 'react';

import { ModalContext } from 'context/modalContext';

const useModal = () => {
  const { state, setState } = useContext(ModalContext);

  return [state, setState];
};

export default useModal;
