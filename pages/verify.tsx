import CustomHead from "@/components/CustomHead"
import GlobalPreloader from "@/components/GlobalPreloader"
import { useAuth } from "@/hooks/redux-hooks"
import { checkUser } from "@/store/slices/auth-slice"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const VerifyPage = () => {
	const router = useRouter()
	const { token } = useAuth()

	const [isLoad, setIsLoad] = useState(false)

	useEffect(() => {
		if (token) {
			checkUser(token).then(resp => {
				if (resp && !resp.isVerify) {
					setIsLoad(true)
				} else if(resp && resp.isVerify) {
					router.push('/404')
				}
			})
		}
	}, [token])

	if (!isLoad) return <GlobalPreloader />
	return (
		<div className="w-full h-screen bg-main-blue flex justify-center items-center">
			<CustomHead title="Verify" metaDesc="verify your account" />
			<h2 className="text-white text-center text-lg mx-4">
				Please confirm your account, a confirmation message was sent to your email.
				<div className="font-semibold">Also don&apos;t forget to check your spam folder!</div>
			</h2>
		</div>
	)
}

export default VerifyPage