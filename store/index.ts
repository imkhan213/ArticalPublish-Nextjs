import { combineReducers, configureStore } from "@reduxjs/toolkit"
import articleSlice from "./slices/article-slice"
import authSlice from "./slices/auth-slice"

const rootReducer = combineReducers({
	auth: authSlice,
	article: articleSlice
})

export const store = configureStore({
	reducer: rootReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch