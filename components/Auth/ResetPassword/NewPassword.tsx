import { useAppSelector } from "@/hooks/redux-hooks"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import AuthInput from "../AuthInput"
import Button from "../Button"

export interface INewPasswordFormValue {
	password: string
	confirmPassword: string
}

const NewPassword: FC<{ onSubmit: (password: string) => void }> = (props) => {
	const { status } = useAppSelector(state => state.auth)
	const { register, handleSubmit } = useForm<INewPasswordFormValue>({ mode: "onSubmit" })
	const [isPasswordsMatch, setIsPasswordsMatch] = useState(true)


	const onSubmit = handleSubmit((data) => {
		setIsPasswordsMatch(true)

		if (data.password !== data.confirmPassword) {
			setIsPasswordsMatch(false)
			return
		}

		props.onSubmit(data.password)
	})

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			autoComplete="off"
			className="w-[300px] min-[530px]:w-[460px] min-h-[240px] border-2 border-main-blue rounded-lg p-4 flex flex-col"
		>
			<h2 className="m-0 text-center text-2xl font-semibold mb-6">Enter a new password</h2>
			<AuthInput
				register={register}
				inputName="password"
				label="Password"
			/>
			<div className="mt-3">
				<AuthInput
					register={register}
					inputName="confirmPassword"
					label="Confirm password"
				/>
			</div>
			{!isPasswordsMatch &&
				<div className="mt-2 text-sm text-red-500 w-[84%] mx-auto">Passwords do not match</div>
			}
			<Button
				status={status}
				text="Submit"
				tailwindStyles="mb-2"
			/>
		</form>
	)
}

export default NewPassword