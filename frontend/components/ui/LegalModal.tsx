"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { LEGAL_DOCUMENTS } from "@/data/legal";
import type { LegalDocumentId } from "@/types/content/legal";

interface LegalModalContextValue {
  openTerms: () => void;
  openPrivacy: () => void;
}

const LegalModalContext = createContext<LegalModalContextValue | null>(null);

export function useLegalModal() {
  const ctx = useContext(LegalModalContext);
  if (!ctx) throw new Error("useLegalModal debe usarse dentro de LegalModalProvider");
  return ctx;
}

export function LegalModalProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<LegalDocumentId | null>(null);

  const openTerms = useCallback(() => setOpenId("terms"), []);
  const openPrivacy = useCallback(() => setOpenId("privacy"), []);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openId]);

  const doc = openId ? LEGAL_DOCUMENTS.find((d) => d.id === openId) : null;

  return (
    <LegalModalContext.Provider value={{ openTerms, openPrivacy }}>
      {children}
      {doc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <div className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="flex items-start justify-between gap-4 px-8 pt-7 pb-5 border-b border-gray-100">
              <div>
                <h2
                  id="legal-modal-title"
                  className="text-xl font-extrabold text-gray-900 tracking-tight"
                >
                  {doc.title}
                </h2>
                <p className="text-xs text-gray-400 mt-1">{doc.updated}</p>
              </div>
              <button
                id="legal-modal-close"
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-8 py-6 overflow-y-auto flex flex-col gap-6">
              {doc.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold text-gray-900 mb-2 text-[0.9375rem]">
                    {section.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </LegalModalContext.Provider>
  );
}
