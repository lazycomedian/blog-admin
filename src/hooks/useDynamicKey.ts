import { useEffect, useState } from "react";

export const useDynamicKey = (deps: any[] = []) => {
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    setKey(Date.now());
  }, deps);

  return key;
};
