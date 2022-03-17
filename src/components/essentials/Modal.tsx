import React, { createRef, useEffect } from "react";

export const Modal: React.FC<{
  children: React.ReactNode;
  parentClassName: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  dependencyValues?: boolean[] | number[] | string[];
  onCloseCallback?: () => void;
  style?: React.CSSProperties;
  zIndex?: number;
}> = ({ children, parentClassName, active, setActive, zIndex, style, onCloseCallback, dependencyValues }) => {
  const ref = createRef<HTMLDivElement>();

  // @ https://usehooks-ts.com/react-hook/use-on-click-outside

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        setActive(false);
        if (onCloseCallback !== undefined) {
          onCloseCallback!();
        }
        return;
      }
    };
    if (active) {
      document.addEventListener("mouseup", clickHandler);
    }
    return () => {
      document.removeEventListener("mouseup", clickHandler);
    };
  }, [dependencyValues, active]);

  return (
    <div ref={ref} className={parentClassName} style={{ ...style, zIndex: zIndex ? zIndex : 3 }}>
      {children}
    </div>
  );
};
