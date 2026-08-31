import { useSyncExternalStore } from "react";

// Tiny shared store so the header settings gear and the passkey panel (rendered
// far apart in the tree) can share one open/close flag without a state library.
let open = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => open;

const toggle = () => {
  open = !open;
  for (const listener of listeners) listener();
};

export function usePasskeyPanel() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { open: value, toggle };
}
