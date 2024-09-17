import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { checkUser, IUser, logout } from "@/store/slices/auth-slice"
import { getArtlist, getSubscription } from "@/store/slices/article-slice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks"
import Header from "@/components/Header"
import ProfileTabs from "@/components/Profile/Tabs"
import GlobalPreloader from "@/components/GlobalPreloader"
import CustomHead from "@/components/CustomHead"

const ProfileDefault = () => {
	const dispatch = useAppDispatch()
	const { token } = useAppSelector(state => state.auth.userData)
	const router = useRouter()
	const [userData, setUserData] = useState<null | IUser>(null)

	const [subscriptions, setsubscriptions] = useState(null);

	const getUserData = async () => {
		setUserData(null)
		if (token) {
			const data = await checkUser(token)
			if (!data) {
				dispatch(logout({}))
				router.push("/auth/login_in")
			}
			else setUserData(data)

			if (data !== false && '_id' in data) {
				getSubscription(data._id).then((resp) => {
				  setsubscriptions(resp);
				});
			}
		}
	}

	const [artItems, setartItems] = useState(null);
	
	useEffect(() => {
		if (typeof localStorage !== "undefined" && !localStorage.getItem('token')) {
			dispatch(logout({}))
			router.push("/auth/login_in")
		}

		getUserData()


		getArtlist().then(resp => {
			setartItems(resp);
		})

	}, [token])

	if (!userData) return <GlobalPreloader />

	if (!artItems) return <GlobalPreloader />
	if (!subscriptions) return <GlobalPreloader />
	//console.log(artItems);


	return (
		<div className="">
			<CustomHead title="Your profile" metaDesc={`${userData.firstName} ${userData.lastName}`} />
			<Header />
			<div className="w-[90%] mx-auto mt-10">
				<ProfileTabs profile="my" userData={userData} getUserData={getUserData} artItems={artItems} subscriptions={subscriptions} />
			</div>
		</div>
	)
}

export default ProfileDefault