import { RefObject, useEffect } from "react";

export const useDetectOutsideClick = (
  el: RefObject<HTMLDivElement>,
  toggle: boolean,
  setToggle?: (val: boolean) => void
) => {
  useEffect(() => {
    const onClick = (e: any) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setToggle?.(!toggle);
        console.log("exec a", !toggle);
      }
    };

    if (toggle) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, el]);
};
