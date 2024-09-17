import { ErrorsBlock } from "@/components/Auth/ErrorsBlock"
import LoginIn, { ILoginInFormValues } from "@/components/Auth/Login_in/Login_in"
import CustomHead from "@/components/CustomHead"
import Header from "@/components/Header"
import { useAppDispatch } from "@/hooks/redux-hooks"
import { loginIn } from "@/store/slices/auth-slice"
import { useRouter } from "next/router"
import { useState } from "react"

const LoginInPage = () => {
	const [errors, setErrors] = useState<string[]>([])
	const dispatch = useAppDispatch()
	const router = useRouter()

	const loginInHandler = (data: ILoginInFormValues) => {
		setErrors([])

		
	}

	return (
		<div className="">
			<CustomHead title="Log in" metaDesc="SP Log in" />
			<Header />
			<div className="flex flex-col justify-center items-center min-h-[90vh] py-[40px]">
				<ErrorsBlock errors={errors} />
				<LoginIn onSubmit={loginInHandler} />
			</div>
		</div>
	)
}

export default LoginInPage