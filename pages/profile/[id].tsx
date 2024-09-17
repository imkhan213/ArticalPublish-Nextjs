import CustomHead from "@/components/CustomHead"
import GlobalPreloader from "@/components/GlobalPreloader"
import Header from "@/components/Header"
import { instance } from "@/components/Layout"
import ProfileTabs from "@/components/Profile/Tabs"
import { useAuth } from "@/hooks/redux-hooks"
import { checkUser, IUser } from "@/store/slices/auth-slice"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ProfilePage = () => {
	const { token } = useAuth()
	const { query, push } = useRouter()
	const [userData, setUserData] = useState<null | IUser>(null)

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data } = await instance.get<IUser>(`user/${query.id}`)
				const resp = await checkUser(token!)
				if (resp && data._id === resp._id) {
					push('/profile')
					return
				}
				setUserData(data)
			} catch (err) {
				push('/404')
			}
		}

		if (query.id) getUser()
	}, [query.id, token])

	if (!userData) return <GlobalPreloader />
	return (
		<div className="">
			<CustomHead title={`${userData.firstName} ${userData.lastName}`} metaDesc={`${userData.firstName} ${userData.lastName}`} />
			<Header />
			<div className="w-[90%] mx-auto mt-10">
				<ProfileTabs profile="not_my" userData={userData} getUserData={() => {}} artItems={[]} />
			</div>
		</div>
	)
}

export default ProfilePage