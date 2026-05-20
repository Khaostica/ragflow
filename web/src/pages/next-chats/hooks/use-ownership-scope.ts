import { useCallback, useEffect, useState } from 'react';

export const OWNERSHIP_SCOPE_STORAGE_KEY = 'chats-ownership-scope';

export type OwnershipScope = 'mine' | 'all';

const isOwnershipScope = (value: unknown): value is OwnershipScope =>
  value === 'mine' || value === 'all';

const readStoredScope = (): OwnershipScope => {
  if (typeof window === 'undefined') {
    return 'mine';
  }
  const stored = window.localStorage.getItem(OWNERSHIP_SCOPE_STORAGE_KEY);
  return isOwnershipScope(stored) ? stored : 'mine';
};

export const useOwnershipScope = () => {
  const [scope, setScopeState] = useState<OwnershipScope>(readStoredScope);

  useEffect(() => {
    window.localStorage.setItem(OWNERSHIP_SCOPE_STORAGE_KEY, scope);
  }, [scope]);

  const setScope = useCallback((next: OwnershipScope) => {
    setScopeState(next);
  }, []);

  return { scope, setScope };
};
