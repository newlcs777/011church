import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useSwipeBack({
  enabled = true,
  threshold = 80,
} = {}) {
  const navigate = useNavigate();
  const startX = useRef(null);

  function onTouchStart(e) {
    if (!enabled) return;
    startX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e) {
    if (!enabled || startX.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX.current;

    // swipe da borda esquerda → direita
    if (startX.current < 40 && diff > threshold) {
      navigate(-1);
    }

    startX.current = null;
  }

  return {
    onTouchStart,
    onTouchEnd,
  };
}
