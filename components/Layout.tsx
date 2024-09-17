import { useAppDispatch } from "@/hooks/redux-hooks"
import { useListenUser } from "@/hooks/use-listen-user"
import { setUserData } from "@/store/slices/auth-slice"
import axios from "axios"
import { NextPage } from "next"
import { ReactElement, useEffect } from "react"

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
export const instance = axios.create({
	baseURL
})

const Layout: NextPage<{ children: ReactElement }> = (props) => {
	const dispatch = useAppDispatch()
	useListenUser()

	useEffect(() => {
		if (localStorage.getItem("token") && localStorage.getItem("email") && localStorage.getItem("id")) {
			dispatch(setUserData({
				token: localStorage.getItem("token"),
				email: localStorage.getItem("email"),
				id: localStorage.getItem("id")
			}))
		}
	}, [])

	return (
		<div className="max-w-[1920px] mx-auto relative">
			{props.children}
		</div>
	)
}

export default Layout