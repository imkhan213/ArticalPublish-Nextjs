import { allowedRoutes, checkUser, IUser, logout } from "@/store/slices/auth-slice"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAppDispatch, useAuth } from "./redux-hooks"

export const useListenUser = () => {
	const { token } = useAuth()
	const router = useRouter()
	const dispatch = useAppDispatch()

	const _checkUser = async () => {
		const token = localStorage.getItem("token")

		if (token) {
			const data = await checkUser(token)

			if (data) {
				if (!data.isVerify && !allowedRoutes.includes(router.pathname)) {
					router.push("/verify")
				}
			} else {
				dispatch(logout({}))
				router.push('/auth/login_in')
			}
		}
	}

	useEffect(() => {
		if (router.isReady) {
			_checkUser()
		}
	}, [router.pathname, token])
}