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
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1] as const,
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.02, y: -4 }}
      aria-hidden={false}
    >
      {/* window chrome */}
      <div className="rounded-t-xl px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200/50 dark:border-slate-600/50 backdrop-blur-sm flex items-center gap-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block shadow-sm hover:bg-red-500 transition-colors" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block shadow-sm hover:bg-yellow-500 transition-colors" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block shadow-sm hover:bg-green-500 transition-colors" />
        </div>
        <div className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-300 font-mono select-none flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Intro.ts
        </div>
      </div>

      {/* code card */}
      <div className="rounded-b-xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800/50 border border-gray-200/50 dark:border-slate-700/50 backdrop-blur-sm">
        <div
          className="p-4 sm:p-5 min-h-[180px] md:min-h-[240px] flex bg-gradient-to-br from-white/50 to-transparent overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className="sr-only" aria-live="polite">
            {srText}
          </span>

          {/* line numbers */}
          <div className="flex-shrink-0 pr-4 select-none border-r border-gray-200/30 dark:border-slate-700/30">
            <div className="font-mono text-xs leading-7 text-gray-400 dark:text-gray-600 font-medium">
              {lines.map((_, i) => (
                <div key={i} className="h-7 leading-7 text-right">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* code */}
          <div className="flex-1 min-w-0 overflow-hidden pl-4">
            <pre className="m-0 text-xs sm:text-sm leading-7 font-mono text-slate-800 dark:text-slate-200">
              {displayed.map((line, i) => {
                // Truncate long lines to prevent horizontal scroll
                const maxLineLength = 35;
                const displayLine = line.length > maxLineLength ? line.substring(0, maxLineLength) + '...' : line;
                const tokens = simpleTokenize(displayLine);
                const isCurrent = i === lineIdx;
                return (
                  <div key={i} className="h-7 overflow-hidden">
                    <code className="whitespace-pre break-all">
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
                          className="inline-block align-middle ml-0.5"
                          aria-hidden="true"
                        >
                          <span className="block w-[2px] h-5 rounded-sm bg-indigo-600 dark:bg-indigo-400 animate-blink shadow-sm shadow-indigo-500/50" />
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

      <div className="mt-2 h-1/4" aria-hidden="true">
        {/* nothing — keeps spacing consistent */}
      </div>

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
