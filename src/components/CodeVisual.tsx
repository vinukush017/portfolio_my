// components/CodeVisual.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type CodeVisualProps = {
  lines: string[]; // lines of code to "type"
  speed?: number; // ms per char
  lineDelay?: number; // ms between lines
  loop?: boolean;
  className?: string;
  maxWidth?: number; // px
};

const defaultProps = {
  speed: 24,
  lineDelay: 700,
  loop: true,
  maxWidth: 320,
} as const;

function simpleTokenize(line: string) {
  const tokens: { text: string; kind?: string }[] = [];
  const regex =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|`(?:[^`\\]|\\.)*`|(\/\/.*$)|\b(const|let|var|function|return|import|from|export|if|else|async|await|new|class)\b|(\d+\.?\d*)|([{}()[\].,;:+\-*/%<>!=&|^~?])/gm;

  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(line)) !== null) {
    if (m.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, m.index) });
    }
    if (m[1]) tokens.push({ text: m[1], kind: "string" });
    else if (m[2]) tokens.push({ text: m[2], kind: "string" });
    else if (m[3]) tokens.push({ text: m[3], kind: "comment" });
    else if (m[4]) tokens.push({ text: m[4], kind: "keyword" });
    else if (m[5]) tokens.push({ text: m[5], kind: "number" });
    else if (m[6]) tokens.push({ text: m[6], kind: "punct" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex) });
  return tokens;
}

export default function CodeVisual(props: CodeVisualProps) {
  const { lines, speed, lineDelay, loop, className, maxWidth } = {
    ...defaultProps,
    ...props,
  };
  const [displayed, setDisplayed] = useState<string[]>(() =>
    Array(lines.length).fill("")
  );
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    if (!mountedRef.current) return;

    if (lineIdx >= lines.length) {
      if (loop) {
        const t = setTimeout(() => {
          if (!mountedRef.current) return;
          setDisplayed(Array(lines.length).fill(""));
          setLineIdx(0);
          setCharIdx(0);
        }, 1000);
        return () => clearTimeout(t);
      }
      return;
    }

    const currentLine = lines[lineIdx];
    if (charIdx <= currentLine.length - 1) {
      const t = setTimeout(() => {
        if (!mountedRef.current) return;
        setDisplayed((prev) => {
          const copy = [...prev];
          copy[lineIdx] = currentLine.slice(0, charIdx + 1);
          return copy;
        });
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    const next = setTimeout(() => {
      if (!mountedRef.current) return;
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, lineDelay);
    return () => clearTimeout(next);
  }, [charIdx, lineIdx, isPaused, lines, speed, lineDelay, loop]);

  const srText = lines.join("\n");

  // friendly defaults for style, responsive
  const appliedMaxWidth = maxWidth ?? defaultProps.maxWidth;

  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      style={{ maxWidth: appliedMaxWidth }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      initial={reduceMotion ? undefined : { y: -6, opacity: 0 }}
      animate={reduceMotion ? undefined : { y: [0, -6, 0], opacity: 1 }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        repeatDelay: 2,
        ease: [0.22, 0.61, 0.36, 1] as const,
      }}
      aria-hidden={false}
    >
      {/* window chrome */}
      <div className="rounded-t-2xl px-4 py-2 bg-white/80 dark:bg-slate-800/70 border border-white/60 dark:border-slate-700/60 backdrop-blur-sm flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-400 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-sm" />
        </div>
        <div className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-mono select-none">
          code-snippet.ts
        </div>
      </div>

      {/* code card */}
      <div className="rounded-b-2xl shadow-lg overflow-hidden bg-gradient-to-br from-white/80 to-indigo-50/40 dark:from-slate-900/80 dark:to-slate-800/70 border border-white/60 dark:border-slate-700/60">
        <div
          className="p-4 sm:p-5 min-h-[160px] md:min-h-[220px] flex"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className="sr-only" aria-live="polite">
            {srText}
          </span>

          {/* line numbers */}
          <div className="flex-shrink-0 pr-3 select-none">
            <div className="font-mono text-xs leading-6 text-gray-400 dark:text-gray-500">
              {lines.map((_, i) => (
                <div key={i} className="h-6 leading-6">
                  {(i + 1).toString().padStart(2, " ")}
                </div>
              ))}
            </div>
          </div>

          {/* code */}
          {/* UPDATED: Changed overflow-hidden to overflow-x-auto to allow horizontal scrolling */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <pre className="m-0 text-sm sm:text-base leading-6 font-mono text-slate-800 dark:text-slate-200">
              {displayed.map((line, i) => {
                const tokens = simpleTokenize(line);
                const isCurrent = i === lineIdx;
                return (
                  // UPDATED: Removed overflow-hidden to allow scrolling content to be visible
                  <div key={i} className="h-6">
                    <code className="whitespace-pre">
                      {tokens.map((t, idx) => {
                        let cls = "";
                        switch (t.kind) {
                          case "string":
                            cls = "text-emerald-600 dark:text-emerald-400";
                            break;
                          case "keyword":
                            cls =
                              "text-indigo-700 dark:text-indigo-300 font-semibold";
                            break;
                          case "comment":
                            cls = "text-gray-400 dark:text-gray-500 italic";
                            break;
                          case "number":
                            cls = "text-rose-600 dark:text-rose-400";
                            break;
                          case "punct":
                            cls = "text-slate-600 dark:text-slate-300";
                            break;
                          default:
                            cls = "text-slate-800 dark:text-slate-200";
                        }
                        return (
                          <span key={idx} className={cls}>
                            {t.text}
                          </span>
                        );
                      })}

                      {/* cursor */}
                      {isCurrent && (
                        <span
                          className="inline-block align-middle ml-1"
                          aria-hidden="true"
                        >
                          <span className="block w-[7px] h-4 rounded-sm bg-slate-800 dark:bg-slate-200 animate-blink" />
                        </span>
                      )}
                    </code>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      </div>

      {/* small decorative shadow under the card */}
      <div className="mt-2 h-1/4" aria-hidden="true">
        {/* nothing — keeps spacing consistent */}
      </div>

      {/* local styles for blink animation (keeps file self-contained).
          This is a plain <style> tag (not styled-jsx) so no TS errors. */}
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          49% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s steps(2, start) infinite;
        }

        /* reduce motion support: stop cursor animation when user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-blink { animation: none !important; }
        }
      `}</style>
    </motion.div>
  );
}