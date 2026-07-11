"use client";

import { closeModal } from "@/utils/modal";
import { useEffect } from "react";

export default function Modal({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      const modal = document.getElementById(id);
      if (!modal || modal.classList.contains("hidden")) return;

      closeModal(id);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [id]);

  return (
    <div
      id={id}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal(id);
        }
      }}
      className="fixed inset-0 z-100 hidden items-center justify-center overflow-y-auto overscroll-contain p-4 backdrop-blur-sm"
    >
      {children}
    </div>
  );
}
