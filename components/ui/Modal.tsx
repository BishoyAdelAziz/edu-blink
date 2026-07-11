"use client";

import { useEffect, useRef } from "react";

const lockBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  document.body.style.overflow = "";
};

export default function Modal({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    lockBodyScroll();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto overscroll-contain p-4 backdrop-blur-sm"
    >
      {children}
    </div>
  );
}
