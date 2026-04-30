import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { cn } from "#/lib/utils";

export const TextGenerateEffect = ({
	words,
	subtitle,
	className,
	filter = true,
	duration = 0.5,
}: {
	words: string;
	subtitle?: string;
	className?: string;
	filter?: boolean;
	duration?: number;
}) => {
	const [scope, animate] = useAnimate();
	const wordsArray = words.split(" ");
	const subtitleArray = subtitle?.split(" ") ?? [];

	useEffect(() => {
		const runAnimation = async () => {
			await animate(
				".main-word",
				{
					opacity: 1,
					filter: filter ? "blur(0px)" : "none",
				},
				{
					duration: duration ?? 1,
					delay: stagger(0.2),
				},
			);

			await animate(
				".main-word",
				{
					marginRight: "0px",
					letterSpacing: "-0.02em",
				},
				{
					duration: 0.6,
					ease: [0.16, 1, 0.3, 1],
					delay: stagger(0.04, { from: "last" }),
				},
			);

			await animate(
				".sub-word",
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
				},
				{
					duration: 0.5,
					ease: [0.16, 1, 0.3, 1],
					delay: stagger(0.08),
				},
			);
		};

		runAnimation();
	}, [animate, duration, filter]);

	return (
		<div
			className={cn(
				"flex flex-col items-start px-6 sm:px-12 md:px-16 lg:px-24 w-full [@media(min-width:1255px)]:items-end",
				className,
			)}
		>
			<motion.div ref={scope} className="flex flex-wrap justify-start [@media(min-width:1255px)]:justify-end max-w-full">
				{wordsArray.map((word) => (
					<motion.span
						key={word}
						className="main-word opacity-0
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
              text-white"
						style={{
							filter: filter ? "blur(10px)" : "none",
							marginRight: "0.3em",
							display: "inline-block",
						}}
					>
						{word}
					</motion.span>
				))}

				{subtitleArray.length > 0 && (
					<div className="flex w-full justify-start [@media(min-width:1255px)]:justify-end mt-2 flex-wrap gap-y-1">
						{subtitleArray.map((word) => (
							<motion.span
								key={word}
								className="sub-word opacity-0
                  text-base sm:text-lg md:text-xl
                  text-white/60"
								style={{
									filter: "blur(6px)",
									marginRight: "0.25em",
									display: "inline-block",
								}}
								initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
							>
								{word}
							</motion.span>
						))}
					</div>
				)}
			</motion.div>
		</div>
	);
};
