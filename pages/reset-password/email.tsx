import { ErrorsBlock } from "@/components/Auth/ErrorsBlock"
import Email from "@/components/Auth/ResetPassword/Email"
import CustomHead from "@/components/CustomHead"
import Header from "@/components/Header"
import { useAppDispatch } from "@/hooks/redux-hooks"
import { resetPasswordSendEmail } from "@/store/slices/auth-slice"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "react"

const ResetPasswordEmailPage = () => {
	const [errors, setErrors] = useState<string[]>([])
	const [successMsg, setSuccessMsg] = useState("")
	const dispatch = useAppDispatch()

	const resetPasswordEmailHandler = (email: string) => {
		setErrors([])
		setSuccessMsg("")

		setSuccessMsg("An email with password reset has been sent to you")
	}

	return (
		<div className="">
			<CustomHead title="Reset password email" metaDesc="Reset password email" />
			<Header />
			<div className="flex flex-col justify-center items-center min-h-[90vh] py-[40px]">
				<ErrorsBlock errors={errors} />
				{successMsg
					? <div
						className="
							w-[300px] 
							min-[530px]:w-[460px] bg-purple-50/60 text-green-400
							text-sm 
							font-semibold 
							mb-4 
							rounded-[7px] 
							p-[4px_10px]
							flex items-center gap-[2px]
						"
					>
						<CheckCircleOutlineIcon className="!text-base" />
						{successMsg}
					</div>
					: null
				}
				<Email onSubmit={resetPasswordEmailHandler} />
			</div>
		</div>
	)
}

export default ResetPasswordEmailPage