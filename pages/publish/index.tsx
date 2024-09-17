import { useEffect, useState } from "react"
import Header from "@/components/Header"
import PublishOrEdit from "@/components/Publish/PublishOrEdit"
import CustomHead from "@/components/CustomHead"
import { useRouter } from "next/router"
import { checkUser, IUser, logout } from "@/store/slices/auth-slice"
import GlobalPreloader from "@/components/GlobalPreloader"
import { useAppDispatch, useAuth } from "@/hooks/redux-hooks"

const PublishPage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { token } = useAuth()

	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		if (typeof localStorage !== "undefined" && !localStorage.getItem('token')) {
			dispatch(logout({}))
			router.push("/auth/login_in")
		}

		if (token) {
			checkUser(token).then(resp => {
				if (!resp) {
					dispatch(logout({}))
					router.push("/auth/login_in")
				}
				else setUser(resp)
			})
		}
	}, [token])
	
	if (!user) return <GlobalPreloader />
	return (
		<div className="">
			<CustomHead title="Article publication" metaDesc="article publication" />
			<Header />
			<PublishOrEdit article={null} userId={user._id} userData={user} />
		</div>
	)
}

export default PublishPage