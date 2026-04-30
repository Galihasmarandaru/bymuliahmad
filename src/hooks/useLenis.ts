import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function getLenis() {
	return lenis;
}

/**
 * Detect if running on a touch-only device (iOS / Android).
 * On these devices we skip Lenis entirely and use native scrolling.
 */
function isTouchDevice(): boolean {
	if (typeof window === "undefined") return false;
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0
	);
}

export function useLenis() {
	useEffect(() => {
		const touch = isTouchDevice();

		// On touch devices (phones, tablets, in-app browsers), Lenis'
		// virtual scroll fights with native momentum/rubber-band scrolling
		// and can crash WebViews (e.g. Instagram in-app browser).
		// → Skip Lenis entirely, just let ScrollTrigger use native scroll.
		if (touch) {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";

			// ScrollTrigger still works without Lenis — it hooks into
			// native scroll events automatically.
			return () => {
				for (const t of ScrollTrigger.getAll()) t.kill();
			};
		}

		// Desktop: use Lenis for smooth scrolling
		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		lenis = new Lenis({
			lerp: 0.1,
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 1.5,
		});

		lenis.on("scroll", ScrollTrigger.update);

		const tickerFn = (time: number) => {
			lenis?.raf(time * 1000);
		};

		gsap.ticker.add(tickerFn);
		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis?.off("scroll", ScrollTrigger.update);
			gsap.ticker.remove(tickerFn);
			for (const t of ScrollTrigger.getAll()) t.kill();
			lenis?.destroy();
			lenis = null;
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		};
	}, []);
}
