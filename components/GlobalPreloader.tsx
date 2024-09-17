import Image from "next/image"
import Link from "next/link"
import preloader from "./../images/base-preloader.svg"

const GlobalPreloader = () => {
	return (
		<div className="fixed bg-white z-[100000000000000000000] w-full h-full top-0 left-0 flex flex-col justify-center items-center">
			<Image src={preloader} alt="" className="w-[50px] h-[50px]" />
			<Link href="/auth/login_in" className="text-sm font-medium underline mt-1">Log in</Link>
		</div>
	)
}

export default GlobalPreloader