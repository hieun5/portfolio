import { useEffect, useRef } from "react";

export default function useSkyJourney() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...scene.querySelectorAll<HTMLElement>("[data-reveal]")];
    let frame = 0;
    let cloudStart = 0;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    function update() {
      frame = 0;
      if (!scene) return;
      const y = Math.max(0, window.scrollY);
      const progress = Math.min(1, Math.max(0, (y - cloudStart + innerHeight * 0.65) / (innerHeight * 1.15)));
      const moving = !preference.matches;
      scene.style.setProperty("--stars-opacity", `${1 - progress * 0.94}`);
      scene.style.setProperty("--stars-far-y", `${moving ? -Math.min(y * 0.055, 210) : 0}px`);
      scene.style.setProperty("--stars-near-y", `${moving ? -Math.min(y * 0.13, 360) : 0}px`);
      scene.style.setProperty("--horizon-y", `${moving ? Math.min(y * 0.12, 150) : 0}px`);
      const distance = Math.max(-innerHeight, Math.min(innerHeight, y - cloudStart + innerHeight * 0.5));
      scene.style.setProperty("--cloud-far-y", `${moving ? distance * 0.09 : 0}px`);
      scene.style.setProperty("--cloud-near-y", `${moving ? distance * -0.07 : 0}px`);
      scene.style.setProperty("--sky-haze", `${0.08 + progress * 0.22}`);
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      const transition = scene?.querySelector(".cloud-transition");
      cloudStart = transition ? transition.getBoundingClientRect().top + scrollY : innerHeight * 2;
      requestUpdate();
    }

    function applyMotionPreference() {
      if (!scene) return;
      scene.dataset.motion = preference.matches ? "off" : "on";
      for (const section of sections) {
        if (preference.matches) {
          section.dataset.visible = "true";
          observer.unobserve(section);
        } else if (section.dataset.visible !== "true") {
          section.dataset.visible = "false";
          observer.observe(section);
        }
      }
      measure();
    }

    applyMotionPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", applyMotionPreference);
    let active = true;
    void document.fonts.ready.then(() => { if (active) measure(); });

    return () => {
      active = false;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", applyMotionPreference);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return sceneRef;
}
