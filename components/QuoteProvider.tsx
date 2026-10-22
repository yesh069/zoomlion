"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LeadForm from "./LeadForm";
import { CloseIcon } from "./icons";

// One quote dialog for the whole site: any <QuoteButton> opens it, optionally
// pre-filled with the machine the visitor was looking at.

type Ctx = { openQuote: (machine?: string) => void };
const QuoteCtx = createContext<Ctx>({ openQuote: () => {} });
export const useQuote = () => useContext(QuoteCtx);

export default function QuoteProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [machine, setMachine] = useState<string | undefined>();
  const [session, setSession] = useState(0);

  const openQuote = useCallback((m?: string) => {
    setMachine(m);
    setSession((s) => s + 1);
    dialog.current?.showModal();
  }, []);

  // Close when the backdrop (the dialog element itself) is clicked.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === d) d.close();
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  return (
    <QuoteCtx.Provider value={{ openQuote }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="quote-title"
        className="m-auto w-[min(640px,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto bg-white p-0 text-ink shadow-2xl backdrop:bg-night/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative bg-graphite px-6 py-5 text-white sm:px-8">
          <p className="eyebrow text-lime">Free, no-obligation quote</p>
          <h2 id="quote-title" className="display mt-2 text-3xl">
            {machine ? `Quote: ${machine}` : "Get a quote"}
          </h2>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute right-3 top-3 grid size-10 place-items-center text-white/70 hover:text-white"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-6 py-6 sm:px-8">
          <LeadForm key={session} machine={machine} source="quote-dialog" />
        </div>
      </dialog>
    </QuoteCtx.Provider>
  );
}

export function QuoteButton({
  machine,
  children = "Get a quote",
  className = "",
}: {
  machine?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { openQuote } = useQuote();
  return (
    <button type="button" onClick={() => openQuote(machine)} className={className}>
      {children}
    </button>
  );
}
