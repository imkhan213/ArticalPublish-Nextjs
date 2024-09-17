import { useAppSelector } from "@/hooks/redux-hooks"
import Link from "next/link"
import { FC } from "react"
import { useForm } from "react-hook-form"
import AuthInput from "../AuthInput"
import Button from "../Button"

export interface ILoginInFormValues {
	email: string
	password: string
}

const LoginIn: FC<{ onSubmit: (data: ILoginInFormValues) => void }> = (props) => {
	const { status } = useAppSelector(state => state.auth)

	const {
		register,
		handleSubmit
	} = useForm<ILoginInFormValues>({
		mode: "onSubmit"
	})

	const onSubmit = handleSubmit((data) => {
		props.onSubmit({
			email: data.email.trim(),
			password: data.password
		})
	})

	return (
		<div className="">
			<form
				onSubmit={onSubmit}
				noValidate
				autoComplete="off"
				className="w-[300px] min-[530px]:w-[460px] min-h-[300px] border-2 border-main-blue rounded-lg p-4 flex flex-col"
			>
				<h2 className="m-0 text-center text-2xl font-semibold mb-5">Log in</h2>
				<div className="">
					<AuthInput
						inputName="email"
						label="Email"
						register={register}
					/>
				</div>
				<div className="mt-3">
					<AuthInput
						inputName="password"
						label="Password"
						register={register}
					/>
				</div>
				<Button status={status} text="Log in" />
				<Link href="/reset-password/email" className="text-sm mt-3 w-[84%] mx-auto underline cursor-pointer">Forgot password ?</Link>
				<Link href="/auth/sign_up" className="text-sm mt-1 mb-1 w-[84%] mx-auto">Not registered yet ? <span className="underline">Sign up</span></Link>
			</form>
		</div>
	)
}

export default LoginIn