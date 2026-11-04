import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AdjustmentsHorizontalIcon, ChevronDownIcon, MoonIcon, SunIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const palettes = [
  { id: "ivory-yellow", name: "Ivory Yellow", swatch: "#ffc900", night: "#08090b", day: "#f5f3ef", ink: "#806400" },
  { id: "cobalt-pink", name: "Ocean Pink", swatch: "#ff2d95", night: "#0a0a0a", day: "#f7f9fc", ink: "#007ba7" },
  { id: "mint", name: "Midnight Mint", swatch: "#36f2ce", night: "#070e1b", day: "#f5f8fa", ink: "#0f766e" },
  { id: "orange", name: "Charcoal Orange", swatch: "#ff8547", night: "#101014", day: "#faf7f2", ink: "#c04413" },
  { id: "coral", name: "Indigo Coral", swatch: "#ff738a", night: "#101127", day: "#faf6fb", ink: "#bd3158" },
  { id: "blue", name: "Electric Blue", swatch: "#5b9dff", night: "#080f1c", day: "#f4f7fc", ink: "#245bce" },
] as const;

export default function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(() => document.documentElement.dataset.palette || "mint");
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.dataset.palette = palette;
    const background = getComputedStyle(root).getPropertyValue("--site-background").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      localStorage.setItem("palette", palette);
    } catch { /* Theme controls also work when browser storage is unavailable. */ }
  }, [isDark, palette]);

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
        className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors sm:w-auto sm:px-3 ${open ? "border-accent/40 bg-accent/10 text-accent-dark dark:text-accent-light" : "site-divider site-text-muted hover:border-accent/40 hover:bg-accent/5"}`}
      >
        <AdjustmentsHorizontalIcon aria-hidden="true" className="h-[18px] w-[18px]" />
        <span aria-hidden="true" className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent sm:hidden" />
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
              onClick={() => setIsDark((current) => !current)}
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
              {palettes.map(({ id, name, swatch, night, day, ink }) => (
                <button
                  type="button" key={id} data-palette={id} aria-pressed={palette === id}
                  onClick={() => setPalette(id)} className="theme-palette-card"
                  style={{ "--preview-bg": isDark ? night : day, "--preview-accent": isDark ? swatch : ink, "--preview-ink": isDark ? "#f1f5f9" : "#152034" } as CSSProperties}
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
