import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);

      return () => {
        if (modalRoot && elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
      };
    }
  }, []);

  return elRef.current
    ? createPortal(<div>{children}</div>, elRef.current)
    : null;
}

export default Modal;