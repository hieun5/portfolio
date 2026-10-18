import { useEffect, useRef } from "react";

export default function useSkyJourney() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...scene.querySelectorAll<HTMLElement>("[data-reveal]")];
    const backdrop = scene.querySelector<HTMLElement>(".sky-backdrop");
    const glow = scene.querySelector<HTMLElement>(".sky-glow");
    const farStars = scene.querySelector<SVGElement>(".starfield--far");
    const nearStars = scene.querySelector<HTMLElement>(".starfield--near");
    const moon = scene.querySelector<HTMLElement>(".moon");
    const horizon = scene.querySelector<HTMLElement>(".hero-horizon");
    const farClouds = scene.querySelector<HTMLElement>(".cloud-bank--far");
    const nearClouds = scene.querySelector<HTMLElement>(".cloud-bank--near");
    const appliedStyles = new WeakMap<HTMLElement | SVGElement, { transform?: string; opacity?: string }>();
    let frame = 0;
    let cloudStart = 0;
    let viewportHeight = window.innerHeight;
    let progress = 0;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });

    function setStyle(element: HTMLElement | SVGElement | null, property: "transform" | "opacity", value: string) {
      if (!element) return;
      let styles = appliedStyles.get(element);
      if (!styles) {
        styles = {};
        appliedStyles.set(element, styles);
      }
      if (styles[property] !== value) {
        element.style[property] = value;
        styles[property] = value;
      }
    }

    function syncActivity() {
      if (backdrop) {
        const resting = document.hidden || preference.matches || progress >= 0.96;
        const value = resting ? "true" : "false";
        if (backdrop.dataset.resting !== value) backdrop.dataset.resting = value;
      }
    }

    function update() {
      frame = 0;
      if (document.hidden) return;
      const y = Math.max(0, window.scrollY);
      progress = Math.min(1, Math.max(0, (y - cloudStart + viewportHeight * 0.65) / (viewportHeight * 1.15)));
      const moving = !preference.matches;
      const opacity = `${1 - progress * 0.94}`;
      const farY = moving ? -Math.min(y * 0.055, 210) : 0;

      // Update only the composited layers, avoiding inherited style changes on every page node.
      setStyle(farStars, "opacity", opacity);
      setStyle(nearStars, "opacity", opacity);
      setStyle(moon, "opacity", opacity);
      setStyle(farStars, "transform", `translate3d(0, ${farY}px, 0)`);
      setStyle(nearStars, "transform", `translate3d(0, ${moving ? -Math.min(y * 0.13, 360) : 0}px, 0)`);
      setStyle(moon, "transform", `translate3d(0, ${farY}px, 0) rotate(-18deg)`);
      setStyle(horizon, "transform", `translate3d(0, ${moving ? Math.min(y * 0.12, 150) : 0}px, 0)`);
      const distance = Math.max(-viewportHeight, Math.min(viewportHeight, y - cloudStart + viewportHeight * 0.5));
      setStyle(farClouds, "transform", `translate3d(0, ${moving ? distance * 0.09 : 0}px, 0) scaleX(-1)`);
      setStyle(nearClouds, "transform", `translate3d(0, ${moving ? distance * -0.07 : 0}px, 0)`);
      setStyle(glow, "opacity", `${0.08 + progress * 0.22}`);
      syncActivity();
    }

    function requestUpdate() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    }

    function measure() {
      const transition = scene?.querySelector(".cloud-transition");
      viewportHeight = window.innerHeight;
      cloudStart = transition ? transition.getBoundingClientRect().top + scrollY : viewportHeight * 2;
      requestUpdate();
    }

    function visibilityChanged() {
      syncActivity();
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        measure();
      }
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
      syncActivity();
      measure();
    }

    applyMotionPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", applyMotionPreference);
    document.addEventListener("visibilitychange", visibilityChanged);
    let active = true;
    void document.fonts.ready.then(() => { if (active) measure(); });

    return () => {
      active = false;
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", applyMotionPreference);
      document.removeEventListener("visibilitychange", visibilityChanged);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return sceneRef;
}
