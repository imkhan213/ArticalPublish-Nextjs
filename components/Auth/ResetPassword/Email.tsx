import { useAppSelector } from "@/hooks/redux-hooks"
import Link from "next/link"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import AuthInput from "../AuthInput"
import Button from "../Button"

const Email: FC<{ onSubmit: (email: string) => void }> = (props) => {
	const { status } = useAppSelector(state => state.auth)
	const { register, handleSubmit } = useForm<{ email: string }>({ mode: "onSubmit" })
	const [isEmailError, setIsEmailError] = useState(false)

	const onSubmit = handleSubmit((data) => {
		setIsEmailError(false)

		const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
		if (!reg.test(data.email)) {
			setIsEmailError(true)
			return
		}

		props.onSubmit(data.email)
	})

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			autoComplete="off"
			className="w-[300px] min-[530px]:w-[460px] min-h-[240px] border-2 border-main-blue rounded-lg p-4 flex flex-col"
		>
			<h2 className="m-0 text-center text-2xl font-semibold mb-6">Please set your email</h2>
			<AuthInput
				register={register}
				inputName="email"
				label="Email"
				inputTailwindStyles="h-[34px]"
			/>
			{isEmailError &&
				<div className="text-sm mt-1 text-red-500 font-medium w-[84%] mx-auto">Enter the correct email</div>
			}
			<Button
				status={status}
				text="Submit"
			/>
			<Link href="/auth/sign_up" className="text-sm mt-3 w-[84%] mx-auto underline">Sign up</Link>
		</form>
	)
}

export default Email