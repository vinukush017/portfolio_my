import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AdjustmentsHorizontalIcon, ChevronDownIcon, MoonIcon, SunIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const palettes = [
  { id: "ivory-yellow", name: "Ivory Yellow", swatch: "#ffc900", background: "#08090b", text: "#f5f3ef", dark: true },
  { id: "cobalt-pink", name: "Ocean Pink", swatch: "#ff2d95", background: "#0a0a0a", text: "#f7f9fc", dark: true },
  { id: "navy-red", name: "Royal Blue", swatch: "#bb232b", background: "#ffffff", text: "#20309a", dark: false },
] as const;

export default function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(() => {
    const saved = document.documentElement.dataset.palette;
    return palettes.find(({ id }) => id === saved)?.id || "ivory-yellow";
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = palettes.find(({ id }) => id === palette)?.dark ?? true;
  const lastDarkPalette = useRef<"ivory-yellow" | "cobalt-pink">((() => {
    if (palette !== "navy-red") return palette;
    try {
      return localStorage.getItem("darkPalette") === "cobalt-pink" ? "cobalt-pink" : "ivory-yellow";
    } catch { return "ivory-yellow"; }
  })());

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.dataset.palette = palette;
    const background = getComputedStyle(root).getPropertyValue("--site-background").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      localStorage.setItem("palette", palette);
      if (palette !== "navy-red") {
        lastDarkPalette.current = palette;
        localStorage.setItem("darkPalette", palette);
      }
    } catch { /* Theme controls also work when browser storage is unavailable. */ }
  }, [palette, isDark]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    containerRef.current?.addEventListener("keydown", escape);
    const container = containerRef.current;
    return () => {
      document.removeEventListener("pointerdown", outside);
      container?.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="static shrink-0 sm:relative" onBlur={(event) => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
    }}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Theme settings"
        aria-expanded={open}
        aria-controls="theme-settings"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-accent/30 bg-[var(--site-background)] text-theme-accent text-sm font-medium transition-colors hover:border-accent/60 sm:w-auto sm:px-3"
      >
        <AdjustmentsHorizontalIcon aria-hidden="true" className="h-[18px] w-[18px]" />
        <span className="hidden sm:inline">Theme</span>
        <ChevronDownIcon aria-hidden="true" className={`hidden h-3 w-3 sm:block transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id="theme-settings" role="region" aria-label="Theme settings" className="theme-settings-panel">
          <div className="theme-panel-heading">
            <div>
              <span className="theme-eyebrow">YOUR SPACE, YOUR STYLE</span>
              <h2 className="theme-panel-title">A little more you.</h2>
            </div>
            <button type="button" aria-label="Close theme settings" onClick={() => { setOpen(false); buttonRef.current?.focus(); }} className="theme-close">
              <XMarkIcon aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div className="theme-appearance">
            <div className="theme-appearance-copy">
              <span className="theme-field-label">Appearance</span>
              <span className="theme-current-mode">{isDark ? "After hours" : "Daylight"}</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              aria-label="Dark mode"
              onClick={() => {
                if (palette !== "navy-red") lastDarkPalette.current = palette;
                setPalette(isDark ? "navy-red" : lastDarkPalette.current);
              }}
              className="theme-mode-switch"
            >
              <span aria-hidden="true" className="theme-mode-symbols">
                <SunIcon className="theme-switch-sun" />
                <MoonIcon className="theme-switch-moon" />
              </span>
              <span aria-hidden="true" className="theme-switch-thumb">
                <SunIcon className="theme-thumb-sun" />
                <MoonIcon className="theme-thumb-moon" />
              </span>
              <span className="sr-only">{isDark ? "Dark" : "Light"}</span>
            </button>
          </div>

          <fieldset className="theme-palette-field">
            <legend className="theme-field-label">Pick your palette</legend>
            <div className="theme-palette-grid">
              {palettes.filter(({ dark }) => dark === isDark).map(({ id, name, swatch, background, text }) => (
                <button
                  type="button" key={id} data-palette={id} aria-pressed={palette === id}
                  onClick={() => setPalette(id)} className="theme-palette-card"
                  style={{ "--preview-bg": background, "--preview-accent": swatch, "--preview-ink": text } as CSSProperties}
                >
                  <span aria-hidden="true" className="theme-preview">
                    <span className="theme-preview-nav"><i /><i /><i /></span>
                    <span className="theme-preview-content">
                      <span className="theme-preview-copy"><i /><i /><i /><b /></span>
                      <span className="theme-preview-orbit"><i /></span>
                    </span>
                    <span className="theme-preview-tiles"><i /><i /><i /></span>
                  </span>
                  <span className="theme-card-caption">
                    <span>{name}</span>
                    <span aria-hidden="true" className="theme-card-check">
                      {palette === id && <CheckIcon className="h-3 w-3" />}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
          <div className="theme-panel-footer">
            <span className="theme-saved-dot" aria-hidden="true" />
            Saved for your next visit
          </div>
        </div>
      )}
    </div>
  );
}
