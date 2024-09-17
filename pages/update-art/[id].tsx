import CustomHead from "@/components/CustomHead"
import GlobalPreloader from "@/components/GlobalPreloader"
import Header from "@/components/Header"
import UpdateArtical from "@/components/Publish/UpdateArtical"
import { useAppDispatch, useAuth } from "@/hooks/redux-hooks"
import { IArticle } from "@/store/slices/article-slice"
import { IUser, checkUser, logout } from "@/store/slices/auth-slice"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const EditArticlePage = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { token } = useAuth()

	const [user, setUser] = useState<IUser | null>(null)
	const [article, setArticle] = useState<null | IArticle>(null)

	useEffect(() => {
		if (typeof localStorage !== "undefined" && !localStorage.getItem('token')) {
			dispatch(logout({}))
			router.push("/auth/login_in")
		}

		if (token && router.query.id) {
			checkUser(token).then(resp => {
				if (!resp) {
					dispatch(logout({}))
					router.push("/auth/login_in")
				}
				else {
					const article = resp.myPubs.find(i => i._id === router.query.id)

					if (article) {
						setUser(resp)
						setArticle(!article ? null : article)
					} else {
						router.push("/404")
					}
				}
			})
		}
	}, [token, router.query.id])

	if (!user) return <GlobalPreloader />
	return (
		<div className="">
			<CustomHead title="Edit an article" metaDesc="Edit an article" />
			<Header />
			<UpdateArtical article={article} userId={user._id} />
		</div>
	)
}

export default EditArticlePage