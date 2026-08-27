import { useEffect } from "react";

/** Swaps the global light palette as each "room" enters the viewport. */
export function useAtmosphere() {
  useEffect(() => {
    const rooms = Array.from(document.querySelectorAll<HTMLElement>("[data-atmos-room]"));
    if (!rooms.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const room = (visible?.target as HTMLElement | undefined)?.dataset['atmosRoom'];
        if (room) document.documentElement.dataset['atmos'] = room;
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-20% 0px -20% 0px" },
    );

    rooms.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);
}
