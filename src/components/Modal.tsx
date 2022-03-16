import React, { createRef, useEffect } from "react";

export const Modal: React.FC<{
  children: React.ReactNode;
  parentClassName: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, parentClassName, active, setActive }) => {
  const ref = createRef<HTMLDivElement>();

  // @ https://usehooks-ts.com/react-hook/use-on-click-outside

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        setActive(false);
        return;
      }
    };
    if (active) {
      document.addEventListener("mouseup", clickHandler);
    }
    return () => {
      document.removeEventListener("mouseup", clickHandler);
    };
  }, [active]);

  return (
    <div ref={ref} className={parentClassName}>
      {children}
    </div>
  );
};
