"use client"
import {useEffect, useRef} from "react"

const handleClose = (modalRef: React.RefObject<HTMLDivElement | null>) => {
    if (modalRef.current) {
        modalRef.current.style.display = "none"
    }
}

export default function Modal({ children }: { children: React.ReactNode }){
    const modalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape" || e.key === "Backspace") {
            handleClose(modalRef);
          }
        };
      
        window.addEventListener("keydown", handleKeyDown);
      
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, []);
    return (
        <div
            ref={modalRef}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleClose(modalRef);
                }
            }}
            className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm"
        >
            {children}
        </div>
    );
}