import { useState } from 'react';

export default function useLayoutBg(prop) {
  const [bgProp, setBgProp] = useState({ ...prop });
  return { bgProp, setBgProp };
}
