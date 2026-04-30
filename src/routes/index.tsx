import { createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
	DraggableCardBody,
	DraggableCardContainer,
} from "#/components/ui/draggable-card";
import { TextGenerateEffect } from "#/components/ui/text-generate-effect";
import { getLenis } from "#/hooks/useLenis";
import coverImg from "../../public/img/cover.png";
import img1 from "../../public/img/gallery/gallery1.jpg";
import img2 from "../../public/img/gallery/gallery2.jpg";
import img3 from "../../public/img/gallery/gallery3.jpg";
import img4 from "../../public/img/gallery/gallery4.jpg";
import img5 from "../../public/img/gallery/gallery5.jpg";
import img6 from "../../public/img/gallery/gallery6.jpg";
import img7 from "../../public/img/gallery/gallery7.jpg";
import img8 from "../../public/img/gallery/gallery8.jpg";
import img9 from "../../public/img/gallery/gallery9.jpg";
import img10 from "../../public/img/gallery/gallery10.jpg";
import img11 from "../../public/img/gallery/gallery11.jpg";
import img12 from "../../public/img/gallery/gallery12.jpg";
import img13 from "../../public/img/gallery/gallery13.jpg";
import img14 from "../../public/img/gallery/gallery14.jpg";
import img15 from "../../public/img/gallery/gallery15.jpg";
import img17 from "../../public/img/gallery/gallery17.jpg";
import img18 from "../../public/img/gallery/gallery18.jpg";
import img19 from "../../public/img/gallery/gallery19.jpg";
import img20 from "../../public/img/gallery/gallery20.jpg";
import img21 from "../../public/img/gallery/gallery21.jpg";

export function DraggableCardDemo() {
	const items = [
		{
			image: img7,
			className: "absolute top-30 left-[10%] rotate-[-5deg]",
		},
		// {
		// 	image: img16,
		// 	className: "absolute top-50 left-[30%] rotate-[-7deg]",
		// },
		{
			image: img17,
			className: "absolute top-30 left-[15%] rotate-[8deg]",
		},
		{
			image: img19,
			className: "absolute top-30 right-[10%] rotate-[10deg]",
		},
		{
			image: img20,
			className: "absolute top-60 right-[15%] rotate-[2deg]",
		},
	];
	return (
		<DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
			{items.map((item) => (
				<DraggableCardBody key={item.image} className={item.className}>
					<img
						src={item.image}
						className="pointer-events-none relative z-10 h-96 w-80 object-cover"
						alt=""
					/>
				</DraggableCardBody>
			))}
		</DraggableCardContainer>
	);
}

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({ component: App });

const galleryImages = [
	{ src: img1, width: "280px", height: "420px", marginTop: "0px" },
	{ src: img2, width: "320px", height: "500px", marginTop: "-40px" },
	{ src: img3, width: "260px", height: "380px", marginTop: "60px" },
	{ src: img4, width: "300px", height: "460px", marginTop: "-20px" },
	{ src: img5, width: "340px", height: "520px", marginTop: "40px" },
	{ src: img6, width: "270px", height: "400px", marginTop: "-60px" },
];

function ParallaxSection({
	src,
	children,
}: {
	src: string;
	children: React.ReactNode;
}) {
	const bgRef = useRef<HTMLDivElement>(null);
	const [isWide, setIsWide] = useState(window.innerWidth >= 1255);

	useEffect(() => {
		const check = () => setIsWide(window.innerWidth >= 1255);
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	useEffect(() => {
		if (!isWide) return;
		const lenis = getLenis();
		if (!lenis || !bgRef.current) return;

		const update = () => {
			if (!bgRef.current) return;
			const rect = bgRef.current.parentElement?.getBoundingClientRect();
			const offset = (rect?.top ?? 0) * 0.35;
			bgRef.current.style.transform = `translateY(${offset}px)`;
		};

		gsap.ticker.add(update);
		return () => {
			gsap.ticker.remove(update);
		};
	}, [isWide]);

	return (
		<section
			className="relative overflow-hidden flex flex-col"
			style={{ backgroundColor: "#121212" }}
		>
			{/* Desktop: parallax image on the left */}
			{isWide && (
				<>
					<div
						ref={bgRef}
						className="absolute left-0 -top-48 will-change-transform"
						style={{ width: "45%", height: "140%" }}
					>
						<img
							src={src}
							alt=""
							loading="eager"
							decoding="sync"
							className="h-full w-full object-cover object-center"
						/>
					</div>
					<div className="relative z-10 min-h-screen">{children}</div>
				</>
			)}

			{/* iPad & Mobile: image at bottom with 20% downward offset, text overlay at top-left */}
			{!isWide && (
				<div className="relative flex justify-center items-end px-6 pt-10 pb-0 overflow-hidden min-h-screen">
					<img
						src={src}
						alt=""
						loading="eager"
						decoding="sync"
						className="w-full max-w-md rounded-sm object-cover object-center"
						style={{ aspectRatio: "3/4", transform: "translateY(5%)" }}
					/>
					{/* Text overlay positioned at top-left */}
					<div className="absolute top-4 left-8 z-10">{children}</div>
				</div>
			)}
		</section>
	);
}

function HorizontalGallery() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;
		const track = trackRef.current;
		if (!section || !track) return;

		// On iOS / touch devices, "fixed" pinType is more reliable than "transform"
		const isTouchDevice =
			"ontouchstart" in window || navigator.maxTouchPoints > 0;

		// Tunggu sampai ScrollTrigger siap
		const ctx = gsap.context(() => {
			gsap.to(track, {
				x: () => -(track.scrollWidth - window.innerWidth),
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${track.scrollWidth - window.innerWidth}`,
					scrub: isTouchDevice ? 1 : 2.5,
					pin: true,
					pinType: isTouchDevice ? "fixed" : "transform",
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			});
		}, section);

		// Refresh setelah mount agar posisi pin akurat
		ScrollTrigger.refresh();

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			className="overflow-hidden bg-white"
			style={{ touchAction: "pan-y" }}
		>
			<div
				ref={trackRef}
				className="flex h-screen items-center gap-16 px-16 will-change-transform"
				style={{ width: "max-content" }}
			>
				<div className="shrink-0 pr-8">
					<p className="text-xs tracking-[0.3em] uppercase mb-2 text-black/30">
						Works
					</p>
					{/* <p className="text-5xl w-3/4 text-black/80">Save your memories</p> */}
				</div>

				{galleryImages.map((item, idx) => (
					<div
						key={item.src}
						className="shrink-0 overflow-hidden rounded-sm"
						style={{
							width: item.width,
							height: item.height,
							marginTop: item.marginTop,
						}}
					>
						<img
							src={item.src}
							alt={`Gallery ${idx + 1}`}
							loading="eager"
							decoding="sync"
							className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
						/>
					</div>
				))}

				<div className="shrink-0 pl-8">
					<p className="text-xs tracking-[0.3em] uppercase text-black/30">
						Scroll to explore
					</p>
				</div>
			</div>
		</div>
	);
}

const masonryImages = [
	{ src: img21, height: "610px" },
	{ src: img9, height: "540px" },
	{ src: img10, height: "680px" },
	{ src: img11, height: "460px" },
	{ src: img12, height: "600px" },
	{ src: img13, height: "330px" },
	{ src: img14, height: "510px" },
	{ src: img18, height: "480px" },
	{ src: img15, height: "430px" },
	{ src: img8, height: "550px" },
	{ src: img7, height: "550px" },
	{ src: img17, height: "550px" },
	{ src: img19, height: "550px" },
	{ src: img20, height: "550px" },
];

function MasonryGallery() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const items = gsap.utils.toArray<HTMLElement>(".masonry-item");

			items.forEach((item) => {
				gsap.fromTo(
					item,
					{ y: 60, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: item,
							start: "top bottom-=80",
							end: "top center",
							toggleActions: "play none none reverse",
						},
					},
				);
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Mobile: 1 kolom, Tablet: 2 kolom, Desktop: 4 kolom
	// Pisahkan data per breakpoint via CSS columns
	return (
		<section ref={sectionRef} className="px-4 sm:px-6 md:px-8 py-24">
			{/* Mobile: 1 kolom */}
			<div className="flex flex-col gap-4 sm:hidden">
				{masonryImages.map((item) => (
					<div
						key={item.src}
						className="masonry-item overflow-hidden rounded-sm w-full"
						style={{ height: "600px" }}
					>
						<img
							src={item.src}
							alt=""
							loading="eager"
							className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
						/>
					</div>
				))}
			</div>

			{/* Tablet: 2 kolom */}
			<div className="hidden sm:grid md:hidden grid-cols-2 gap-4 items-start">
				{[0, 1].map((colIdx) => (
					<div
						key={colIdx}
						className="flex flex-col gap-4"
						style={{ marginTop: ["0px", "40px"][colIdx] }}
					>
						{masonryImages
							.filter((_, i) => i % 2 === colIdx)
							.map((item) => (
								<div
									key={item.src}
									className="masonry-item overflow-hidden rounded-sm"
									style={{ height: item.height }}
								>
									<img
										src={item.src}
										alt=""
										loading="eager"
										className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
									/>
								</div>
							))}
					</div>
				))}
			</div>

			{/* Desktop: 4 kolom (original) */}
			<div className="hidden md:grid grid-cols-4 gap-4 items-start">
				{[0, 1, 2, 3].map((colIdx) => (
					<div
						key={colIdx}
						className="flex flex-col gap-4"
						style={{ marginTop: ["0px", "60px", "20px", "90px"][colIdx] }}
					>
						{masonryImages
							.filter((_, i) => i % 4 === colIdx)
							.map((item) => (
								<div
									key={item.src}
									className="masonry-item overflow-hidden rounded-sm"
									style={{ height: item.height }}
								>
									<img
										src={item.src}
										alt=""
										loading="eager"
										className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
									/>
								</div>
							))}
					</div>
				))}
			</div>
		</section>
	);
}

function App() {
	const title = "# by muliadi ahmad";

	useEffect(() => {
		const allImages = [
			...masonryImages.map((i) => i.src),
			...galleryImages.map((i) => i.src),
			coverImg,
		];

		allImages.forEach((src) => {
			const img = new Image();
			img.src = src;
			// decode() memindahkan proses decode ke background thread
			img.decode().catch(() => {});
		});
	}, []);
	return (
		<>
			<ParallaxSection src={coverImg}>
				<div className="flex items-start justify-start text-white py-8 px-0 [@media(min-width:1255px)]:items-center [@media(min-width:1255px)]:justify-end [@media(min-width:1255px)]:min-h-screen [@media(min-width:1255px)]:py-0">
					<TextGenerateEffect
						words={title}
						subtitle="a Professional Photographer"
					/>
				</div>
			</ParallaxSection>

			<HorizontalGallery />

			{/* <DraggableCardDemo /> */}

			<MasonryGallery />

			<section className="flex py-24 items-center justify-center bg-[#121212]">
				<div className="text-center w-2/3 px-10 space-y-12">
					<p className="text-2xl font-light text-white">If you like my taste</p>
					<p className="text-6xl text-white">Let's work together</p>
					<div className="mt-4 flex justify-center gap-4">
						<a
							href="https://www.instagram.com/muliadiahmad_/"
							target="_blank"
							rel="noreferrer"
							className="rounded-xl p-2 text-(--sea-ink-soft) transition hover:bg-(--link-bg-hover) hover:text-(--sea-ink)"
						>
							<span className="sr-only">Go to Instagram</span>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								width="32"
								height="32"
								fill="none"
							>
								<rect
									x="2"
									y="2"
									width="20"
									height="20"
									rx="5.5"
									ry="5.5"
									stroke="currentColor"
									strokeWidth="1.8"
								/>
								<circle
									cx="12"
									cy="12"
									r="4.3"
									stroke="currentColor"
									strokeWidth="1.8"
								/>
								<circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
							</svg>
						</a>
						<a
							href="https://wa.me/6285642506093"
							target="_blank"
							rel="noreferrer"
							className="rounded-xl p-2 text-(--sea-ink-soft) transition hover:bg-(--link-bg-hover) hover:text-(--sea-ink)"
						>
							<span className="sr-only">Go to WhatsApp</span>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								width="32"
								height="32"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill="currentColor"
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M12 2C6.477 2 2 6.477 2 12c0 1.938.551 3.746 1.505 5.279L2 22l4.823-1.487A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zM12 20.182a8.172 8.172 0 01-4.162-1.138l-.298-.177-3.087.884.879-3.178-.194-.308A8.182 8.182 0 1112 20.182zM9.04 7.847c-.198-.44-.407-.449-.595-.457L7.89 7.38c-.176 0-.462.066-.703.33-.242.264-.924.903-.924 2.202s.945 2.554 1.077 2.73c.132.176 1.847 2.957 4.537 4.023.634.274 1.129.437 1.514.56.636.202 1.215.174 1.673.105.51-.076 1.571-.642 1.793-1.262.22-.62.22-1.15.154-1.261-.066-.11-.242-.176-.506-.308-.264-.132-1.562-.77-1.804-.858-.242-.088-.418-.132-.594.132-.176.264-.682.858-.836 1.034-.154.176-.308.198-.572.066-.264-.132-1.116-.411-2.126-1.312-.787-.701-1.317-1.567-1.471-1.831-.154-.264-.016-.407.116-.538.12-.119.264-.309.396-.463.133-.154.177-.264.265-.44.088-.176.044-.33-.022-.462-.066-.132-.581-1.436-.813-1.963z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
