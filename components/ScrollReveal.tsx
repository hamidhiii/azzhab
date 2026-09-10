"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals every [data-reveal] element as it enters the viewport, with a small
 * cascade between siblings. Re-runs on navigation.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    items.forEach((el, i) => {
      const index = el.parentElement
        ? Array.prototype.indexOf.call(el.parentElement.children, el)
        : i;
      el.style.setProperty("--d", `${Math.min(index, 6) * 80}ms`);
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
