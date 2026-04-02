"use client";
import { useEffect, useState } from "react";

export default function Timer({ initial = 300 }: any) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <p className="text-sm text-gray-400 mt-4">Resend code in {formatTime()}</p>
  );
}
