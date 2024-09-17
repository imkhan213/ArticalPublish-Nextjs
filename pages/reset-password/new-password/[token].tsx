import { ErrorsBlock } from "@/components/Auth/ErrorsBlock"
import NewPassword from "@/components/Auth/ResetPassword/NewPassword"
import CustomHead from "@/components/CustomHead"
import GlobalPreloader from "@/components/GlobalPreloader"
import Header from "@/components/Header"
import { instance } from "@/components/Layout"
import { useAppDispatch } from "@/hooks/redux-hooks"
import { logout, resetPasswordNewPassword } from "@/store/slices/auth-slice"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ResetPasswordNewPasswordPage = () => {
	const [errors, setErrors] = useState<string[]>([])
	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading] = useState(true)
	const [isToken, setIsToken] = useState(true)

	const router = useRouter()
	const token = router.query.token as string

	const checkToken = async () => {
		if (token) {
			try {
				setIsLoading(true)
				await instance.get(`auth/get-forgot-password-item/${token}`)
				setIsLoading(false)
				setIsToken(true)
			} catch (err: any) {
				setIsLoading(false)
				setIsToken(false)
			}
		}
	}

	useEffect(() => {
		checkToken()
	}, [token])

	const onSubmit = (password: string) => {
		setErrors([])

		if (token) {
			const afterSubmitHandler = () => {
				dispatch(logout({}))
				router.push("/auth/login_in")
			}

			dispatch(resetPasswordNewPassword({
				password,
				token,
				setErrors,
				afterSubmitHandler
			}))
		}
	}

	if (isLoading) return <GlobalPreloader />
	return (
		<div className="">
			<CustomHead title="New password" metaDesc="New password" />
			<Header />
			{!isToken
				? <div className="min-h-[90vh] flex justify-center items-center relative">
					<span className="relative z-20 text-black text-2xl font-medium">Page is not available</span>
					<FontAwesomeIcon
						icon={faLock}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-main-blue/5 text-[80px]"
					/>
				</div>
				: <div className="flex flex-col justify-center items-center min-h-[90vh] py-[40px]">
					<ErrorsBlock errors={errors} />
					<NewPassword onSubmit={onSubmit} />
				</div>
			}
		</div>
	)
}

export default ResetPasswordNewPasswordPage