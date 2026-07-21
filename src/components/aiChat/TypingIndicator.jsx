import { useState, useEffect } from "react";

export default function TypingIndicator() {
  const [text, setText] = useState("");

  useEffect(() => {
    const sequence = [
      "로",
      "로딩",
      "로딩 중",
      "로딩 중 .",
      "로딩 중 . .",
      "로딩 중 . . .",
      "",
    ];
    let index = 0;

    const interval = setInterval(() => {
      setText(sequence[index]);
      index = (index + 1) % sequence.length;
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[6vw] text-left">
      {text === "" ? "\u00A0" : text}
    </span>
  );
}
