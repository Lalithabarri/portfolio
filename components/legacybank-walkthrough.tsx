"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { LegacyBankStepIllustration } from "@/components/illustrations";
import { legacyBankSteps, type LegacyBankStepId } from "@/content/projects";

// Conceptual walkthrough of LegacyBank: four tabs, one explanation each.
// Arrow keys, Home and End move between steps (WAI-ARIA tabs pattern).
export function LegacyBankWalkthrough() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = legacyBankSteps[activeIndex];

  const select = (index: number) => {
    const next = (index + legacyBankSteps.length) % legacyBankSteps.length;
    setActiveIndex(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(activeIndex + 1),
      ArrowDown: () => select(activeIndex + 1),
      ArrowLeft: () => select(activeIndex - 1),
      ArrowUp: () => select(activeIndex - 1),
      Home: () => select(0),
      End: () => select(legacyBankSteps.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const tabId = (id: LegacyBankStepId) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;

  return (
    <div>
      <div
        role="tablist"
        aria-label="LegacyBank walkthrough steps"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {legacyBankSteps.map((step, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={step.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={tabId(step.id)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={onKeyDown}
              className={`flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "border-navy bg-navy text-paper"
                  : "border-line bg-wash-soft text-navy hover:border-periwinkle hover:bg-wash"
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid size-5 place-items-center rounded-full text-[0.7rem] ${
                  selected ? "bg-paper text-navy" : "bg-paper text-action"
                }`}
              >
                {index + 1}
              </span>
              {step.label}
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(active.id)}
        tabIndex={0}
        className="mt-4 grid items-center gap-4 rounded-2xl border border-line bg-paper/80 p-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6 sm:p-5"
      >
        <div key={active.id} className="animate-fade-up mx-auto w-full max-w-[15rem] sm:max-w-none">
          <LegacyBankStepIllustration step={active.id} />
        </div>
        <div key={`${active.id}-text`} className="animate-fade-up">
          <p className="font-serif text-lg font-medium text-navy">{active.title}</p>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{active.text}</p>
        </div>
      </div>
    </div>
  );
}
