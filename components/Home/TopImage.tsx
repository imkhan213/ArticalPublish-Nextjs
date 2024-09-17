import Image from "next/image"
import Link from "next/link"
import homepageImage from "./../../images/homepage-image.png"

const TopImage = () => {
	return (
		<div className="flex flex-col justify-between gap-5 | min-[1000px]:flex-row-reverse min-[1000px]:items-center">
			<Image src={homepageImage} alt="" className="rounded-md w-[280px] h-[200px] | min-[660px]:w-[400px] min-[660px]:h-[300px] min-[1280px]:w-[500px] min-[1280px]:h-[320px]" />
			<div className="">
				<div className="text-xl min-[660px]:text-2xl">A self-publication platform for researchers ------ where YOU decide what you publish. <span className="font-semibold">Self Pub</span>lish Something Here.</div>
			</div>
		</div>
	)
}

export default TopImage