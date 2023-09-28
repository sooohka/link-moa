"use client";
import { OverlayInfo } from "@/types/layout";
import type { ReactNode } from "react";
import { Fragment, createContext, useCallback, useMemo, useState } from "react";

interface Props {
  children: ReactNode;
}

export type OverlayContextType = {
  handleMount: (id: string, node: ReactNode) => void;
  handleUnmount: (id: string) => void;
};

export const OverlayContext = createContext<OverlayContextType>({
  handleMount: () => null,
  handleUnmount: () => null,
});

function OverlayProvider(props: Props) {
  const { children } = props;
  const [overlays, setOverlays] = useState<OverlayInfo[]>([]);

  const handleUnmount = useCallback((id: string) => {
    setOverlays((prev) => {
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const handleMount = useCallback((id: string, node: ReactNode) => {
    setOverlays((prev) => [...prev, { id, node }]);
  }, []);
  const value = useMemo<OverlayContextType>(
    () => ({
      handleMount,
      handleUnmount,
    }),
    [handleMount, handleUnmount],
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
      {overlays.map((v) => {
        return <Fragment key={v.id}>{v.node}</Fragment>;
      })}
    </OverlayContext.Provider>
  );
}

export default OverlayProvider;
