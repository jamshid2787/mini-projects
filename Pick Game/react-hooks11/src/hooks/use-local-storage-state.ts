import { useState } from 'react';

function getValue<T>(key: string, initialValue: T) {
  console.log('hello');
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : initialValue;
}

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, _setState] = useState<T>(() => getValue(key, initialValue));

  const setState: typeof _setState = data => {
    localStorage.setItem(key, JSON.stringify(data));
    _setState(data);
  };

  return [state, setState] as const;
}
