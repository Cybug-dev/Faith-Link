import { useCallback, useState } from 'react';

// Single-open accordion state. Tapping the open item closes it.
export function useAccordion(initialId: string | null = null) {
  const [openId, setOpenId] = useState<string | null>(initialId);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return { openId, toggle, isOpen: (id: string) => openId === id };
}
