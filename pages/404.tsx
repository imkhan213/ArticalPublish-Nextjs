import Link from "next/link"

const Custom404 = () => {
	return (
		<div className="min-h-screen w-full bg-black flex flex-col justify-center items-center">
			<div className='text-white text-2xl'>Ops... page not found😖</div>
            <Link href='/' className='text-purple-400 text-center text-sm block mt-2 underline'>Visit homepage</Link>
		</div>
	)
}

export default Custom404