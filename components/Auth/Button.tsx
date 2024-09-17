import { FC } from "react"

const Button: FC<{ status: string, text: string, tailwindStyles?: string }> = (props) => {
	return (
		<button
			disabled={props.status === "pending"}
			className={`
				mt-5
				w-[84%]
				h-[32px]
				mx-auto
				duration-500
				disabled:bg-main-blue/70
				bg-main-blue/80
				hover:bg-main-blue
				text-white
				rounded
				outline-none
				${props.tailwindStyles}
			`}
		>
			{props.text}
		</button>
	)
}

export default Button