"use client";

import { useState, useCallback, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const getSnapshot = () => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const getServerSnapshot = () => null;

  const rawValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [fallbackValue, setFallbackValue] = useState<T>(initialValue);

  const parsedValue: T = rawValue !== null ? (() => {
    try {
      return JSON.parse(rawValue);
    } catch {
      return initialValue;
    }
  })() : fallbackValue;

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(parsedValue) : value;
        setFallbackValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new Event("storage"));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, parsedValue]
  );

  return [parsedValue, setValue];
}
