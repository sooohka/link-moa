"use client";

import { OverlayContext } from "@/providers/OverlayProvider";
import { useCallback, useContext, useState, type ReactNode } from "react";

type OverlayComponent<T> = (props: {
  isOpen: boolean;
  close: (arg: T) => void;
}) => ReactNode;

function OverlayController<T>(props: {
  id: string;
  Component: OverlayComponent<T>;
  resolver: (value: T | PromiseLike<T>) => void;
}) {
  const { id, Component, resolver } = props;
  const { handleUnmount } = useContext(OverlayContext);

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = useCallback(<T,>(arg: T) => {
    const closeAnimationDuration = 500;
    setIsOpen(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resolver(arg);

    setTimeout(() => {
      handleUnmount(id);
    }, closeAnimationDuration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component isOpen={isOpen} close={handleClose} />;
}

/**
 *  useOverlay
 * @description overlay를 선언형으로 사용할 수 있게 해주는 hook
 * @example
 * const { render } = useOverlay();
 * const result = await render<boolean>(({isOpen, close}) => <Modal isOpen={isOpen} onClose={()=>close(true)} />);
 * console.log(result) // true or false
 *
 * const result = await render<People>(({isOpen, close}) => <Modal isOpen={isOpen} onClose={()=>close(somPeople)} />);
 * console.log(result) // People
 */
const useOverlay = () => {
  const { handleMount } = useContext(OverlayContext);

  const render = useCallback(
    function <T>(component: OverlayComponent<T>) {
      return new Promise<T>((resolver) => {
        const id = Date.now().toString();
        handleMount(
          id,
          <OverlayController
            id={id}
            Component={component}
            resolver={resolver}
          />,
        );
      });
    },
    [handleMount],
  );

  return { render };
};

export default useOverlay;
