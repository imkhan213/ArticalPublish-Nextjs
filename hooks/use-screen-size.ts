import { useEffect, useState } from "react";

export const useScreenSize = (): number => {
	const [screenSize, setScreenSize] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const resizeHandler = () => {
				setScreenSize(window.innerWidth);
			};

			window.addEventListener('resize', resizeHandler);

			return () => {
				window.removeEventListener('resize', resizeHandler);
			}
		}
	}, [])

	return screenSize;
};