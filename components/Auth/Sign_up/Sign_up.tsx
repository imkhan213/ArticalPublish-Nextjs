import { useAppSelector } from "@/hooks/redux-hooks"
import { SignUpData } from "@/pages/auth/sign_up"
import Link from "next/link"
import { FC, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import AuthInput from "../AuthInput"
import Button from "../Button"
import FirstAndLastName from "./FirstAndLastName"
import InstitutionInfo from "./InstitutionInfo/InstitutionInfo"

export interface ISignUpFormValues {
	firstName: string
	lastName: string
	email: string
	password: string
}

const SignUp: FC<{ onSubmit: (data: SignUpData) => void, setErrors: (errs: string[]) => void }> = (props) => {
	const { status } = useAppSelector(state => state.auth)
	const [institution, setInstitution] = useState("")
	const [position, setPosition] = useState({
		main: "",
		specifyOther: ""
	})
	const [areaOfInterest, setAreaOfInterest] = useState("")

	const {
		register,
		handleSubmit
	} = useForm<ISignUpFormValues>({
		mode: "onSubmit"
	})

	const onSubmit = handleSubmit((data) => {
	
		props.setErrors([])
		if (
			!institution.trim() ||
			(!position.main.trim() && !position.specifyOther.trim() && !areaOfInterest.trim()) ||
			(position.main === "Specify other" && !position.specifyOther.trim())
		) {
			props.setErrors(["Please fill in all fields"])
			return
		}

		props.onSubmit({
			firstName: data.firstName.trim(),
			lastName: data.lastName.trim(),
			email: data.email.trim(),
			institution: institution.trim(),
			position: position.specifyOther.trim() ? position.specifyOther.trim() : position.main.trim(),
			areaOfInterest, 
			password: data.password
		})
	})


	return (
		<form
			onSubmit={onSubmit}
			noValidate
			autoComplete="off"
			className="w-[300px] min-[530px]:w-[460px] min-h-[460px] border-2 border-main-blue rounded-lg p-4 flex flex-col"
		>
			<h2 className="m-0 text-center text-2xl font-semibold mb-5">Sign up</h2>
			<FirstAndLastName register={register} />
			<div className="mt-2">
				<AuthInput
					label="Email"
					register={register}
					inputName="email"
				/>
			</div>
			<InstitutionInfo
				institution={institution}
				setInstitution={setInstitution}
				position={position}
				setPosition={setPosition}
				areaOfInterest={areaOfInterest}
				setAreaOfInterest={setAreaOfInterest}
			/>
			<div className="mt-2">
				<AuthInput
					label="Password"
					register={register}
					inputName="password"
				/>
			</div>
			<Button status={status} text="Sign up" />
			<Link href="/auth/login_in" className="text-sm mt-3 mb-1 w-[84%] mx-auto">Do you already have an account ? <span className="underline">Log in</span></Link>
		</form>
	)
}

export default SignUp