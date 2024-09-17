import { ErrorsBlock } from "@/components/Auth/ErrorsBlock"
import SignUp, { ISignUpFormValues } from "@/components/Auth/Sign_up/Sign_up"
import CustomHead from "@/components/CustomHead"
import Header from "@/components/Header"
import { useAppDispatch } from "@/hooks/redux-hooks"
import { signUp } from "@/store/slices/auth-slice"
import { useRouter } from "next/router"
import { useState } from "react"

export interface SignUpData extends ISignUpFormValues {
	institution: string
	position: string
	areaOfInterest: string
}

const SignUpPage = () => {
	const [errors, setErrors] = useState<string[]>([])
	const dispatch = useAppDispatch()
	const router = useRouter()

	const signUpDataHandler = (data: SignUpData) => {
		setErrors([])
 
	}

	return (
		<div className="">
			<CustomHead title="Sign up" metaDesc="SP sign up" />
			<Header />
			<div className="flex flex-col justify-center items-center min-h-[90vh] py-[40px]">
				<ErrorsBlock errors={errors} />
				<SignUp onSubmit={signUpDataHandler} setErrors={setErrors} />
			</div>
		</div>
	)
}

export default SignUpPage