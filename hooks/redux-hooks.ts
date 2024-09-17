import { AppDispatch, AppStateType } from "@/store"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export const useAuth = () => {
	const { email, id, token } = useAppSelector(state => state.auth.userData)

	return {
		isAuth: !!token,
		token,
		id,
		email
	}
}