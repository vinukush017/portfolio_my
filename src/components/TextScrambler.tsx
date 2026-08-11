import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";

interface Props {
  texts: string[]; // multiple phrases
  speed?: number;
  interval?: number; // time before switching to next
  className?: string;
}

const TextScramblerCycler: React.FC<Props> = ({
  texts,
  speed = 50,
  interval = 4000,
  className = "",
}) => {
  const [displayed, setDisplayed] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [index, setIndex] = useState(0);
  const frame = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const scramble = (text: string) => {
    setRevealed(false);
    frame.current = 0;

    const animate = () => {
      const output = text.split("").map((char, i) => {
        if (i < frame.current) return char;
        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      });

      setDisplayed(output.join(""));

      if (frame.current < text.length) {
        frame.current += 1;
        timeoutRef.current = setTimeout(animate, speed);
      } else {
        setRevealed(true);
      }
    };

    animate();
  };

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(texts[0] ?? "");
      setRevealed(true);
      return;
    }

    scramble(texts[index]);

    const loop = setInterval(() => {
      setIndex((current) => (current + 1) % texts.length);
    }, interval);

    return () => {
      clearInterval(loop);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, texts, speed, interval, reduceMotion]);

  return (
    <>
      <span className="sr-only">{texts.join(", ")}</span>
      <span
        aria-hidden="true"
        className={`${className} transition-colors duration-700 ${
          revealed ? "text-gradient" : "text-gray-400"
        } break-words`}
      >
        {displayed}
      </span>
    </>
  );
};

export default TextScramblerCycler;
