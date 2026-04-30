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
 * Detect if running on iOS (iPhone / iPad / iPod).
 * Covers both pre-iOS-13 UA strings and post-iOS-13 iPad
 * that identifies as "Macintosh".
 */
function isIOS(): boolean {
	if (typeof navigator === "undefined") return false;
	return (
		/iP(hone|od|ad)/.test(navigator.userAgent) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
	);
}

export function useLenis() {
	useEffect(() => {
		const ios = isIOS();

		// On iOS Safari, Lenis' virtual scroll fights with the native
		// rubber-band / momentum behaviour and blocks touch-scrolling entirely.
		// → Use Lenis in "native" wrapper mode so it only provides the
		//   ScrollTrigger sync while letting the browser handle touch natively.
		if (ios) {
			// Let the browser scroll natively — don't hide overflow
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";

			lenis = new Lenis({
				wrapper: window as unknown as HTMLElement,
				content: document.documentElement,
				lerp: 0.1,
				smoothWheel: false, // don't hijack wheel on iOS (rarely relevant)
				touchMultiplier: 0, // let browser handle touch entirely
				syncTouch: false,
			});
		} else {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";

			lenis = new Lenis({
				lerp: 0.1,
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 1.5,
			});
		}

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
