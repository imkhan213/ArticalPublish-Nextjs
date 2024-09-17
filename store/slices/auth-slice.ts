import { instance } from "@/components/Layout"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IArticle, IReview } from "./article-slice"

export const allowedRoutes = [
	"/auth/login_in",
	"/auth/sign_up",
	"/",
	"/articles",
	"/reset-password/email"
]

export const handleRepsErrors = (error: any) => {
	if (error.response.data.constructor.name === "Object") {
		return error.response.data.message
	}
	return error.response.data
}

interface ISignUp {
	firstName: string
	lastName: string
	email: string
	institution: string
	position: string
	areaOfInterest: string
	password: string
	setErrors: (errs: string[]) => void
	afterSignUpHandler: () => void
}

export const signUp = createAsyncThunk(
	"auth/register",
	async (data: ISignUp) => {
		try {
			const resp = await instance.post("auth/register", {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				institutionInfo: {
					institutionName: data.institution,
					position: data.areaOfInterest ? null : data.position,
					areaOfInterest: data.position ? null : data.areaOfInterest,
				},
				password: data.password,
				role: "site"
			})
			data.afterSignUpHandler()
			return resp.data
		} catch (err: any) {
			data.setErrors(handleRepsErrors(err))
		}
	}
)

interface ILoginIn {
	email: string
	password: string
	setErrors: (errs: string[]) => void
	afterLoginInHandler: () => void
}

export const loginIn = createAsyncThunk(
	"auth/login",
	async (data: ILoginIn) => {
		try {
			const resp = await instance.post("/auth/login", {
				email: data.email,
				password: data.password
			})
			data.afterLoginInHandler()
			return resp.data
		} catch (err: any) {
			data.setErrors(handleRepsErrors(err))
		}
	}
)

interface IResetPasswordSendEmail {
	email: string
	setErrors: (errs: string[]) => void
	afterSendEmailHandler: () => void
}

export const resetPasswordSendEmail = createAsyncThunk(
	"auth/resetPasswordSendEmail",
	async (data: IResetPasswordSendEmail) => {
		try {
			await instance.put(`auth/forgot-password/${data.email}`)
			data.afterSendEmailHandler()
		} catch (err) {
			data.setErrors(handleRepsErrors(err))
		}
	}
)

interface IResetPasswordNewPassword {
	token: string
	password: string
	setErrors: (errs: string[]) => void
	afterSubmitHandler: () => void
}

export const resetPasswordNewPassword = createAsyncThunk(
	"auth/resetPasswordNewPassword",
	async (data: IResetPasswordNewPassword) => {
		try {
			await instance.put("auth/reset-password", {
				token: data.token,
				newPassword: data.password
			})
			data.afterSubmitHandler()
		} catch (err: any) {
			data.setErrors(handleRepsErrors(err))
		}
	}
)

export const checkUser = async (token: string): Promise<IUser | false> => {
	const email = localStorage.getItem('email')
	const id = localStorage.getItem('id')

	try {
		const resp = await instance.get<IUser>(`user/getByToken`, {
			headers: {
				authorization: `Bearer ${token}`
			}
		})

		if (resp.data.email !== email || resp.data._id !== id) {
			return false
		}

		return resp.data

	} catch {
		return false
	}
}

export async function checkSubs(userId: any) {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/subscription/checksubs/${userId}`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch');
  	}
  	return response.json();
}

export async function ownerDetails(userId: any) {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiUrl = baseURL+`/user/${userId}`; // Replace with the actual API endpoint
  const response = await fetch(apiUrl);

  if (!response.ok) {
    // Handle errors based on the response status
    throw new Error('Failed to fetch user details');
  }

  return response.json();
}

interface IEditProfile {
	token: string
	firstName: string
	lastName: string
	publicKey: string
	secretKey: string
	institution: string
	position: string
	areaOfInterest: string
	setErrors: (errs: string[]) => void
	afterEditHandler: () => void
}

export const editProfile = createAsyncThunk(
	"auth/editProfile",
	async (data: IEditProfile) => {
		try {
			await instance.put('user', {
				firstName: data.firstName,
				lastName: data.lastName,
				publicKey: data.publicKey,
				secretKey: data.secretKey,
				institutionInfo: {
					institutionName: data.institution,
					position: data.areaOfInterest ? null : data.position,
					areaOfInterest: data.position ? null : data.areaOfInterest,
				}
			}, {
				headers: {
					authorization: `Bearer ${data.token}`
				}
			})
			data.afterEditHandler()
		} catch (err: any) {
			data.setErrors(handleRepsErrors(err))
		}
	}
)

export interface IUser {
	_id: string
	firstName: string
	lastName: string
	email: string
	publicKey: string
	secretKey: string
	institutionInfo: {
		institutionName: string
		position: string | null
		areaOfInterest: string | null
	}
	isVerify: boolean
	myPubs: IArticle[]
	myReviews: IReview[]
	artItems: any
	role: any
	permissions: any
}

const initialState = {
	status: "" as "pending" | "ready",
	userData: {
		token: null,
		id: null,
		email: null
	}
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserData(state, action) {
			state.userData = action.payload
		},

		logout(state, action) {
			state.userData = {
				token: null,
				id: null,
				email: null
			}
			localStorage.removeItem("token")
			localStorage.removeItem("id")
			localStorage.removeItem("email")
		}
	},
	extraReducers(builder) {
		builder.addCase(signUp.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(signUp.fulfilled, (state, action) => {
			if (action.payload) {
				state.userData.token = action.payload.token
				state.userData.id = action.payload.user._id
				state.userData.email = action.payload.user.email
				localStorage.setItem("token", action.payload.token)
				localStorage.setItem("id", action.payload.user._id)
				localStorage.setItem("email", action.payload.user.email)
			}
			state.status = "ready"
		})


		builder.addCase(loginIn.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(loginIn.fulfilled, (state, action) => {
			if (action.payload) {
				state.userData.token = action.payload.token
				state.userData.id = action.payload.user._id
				state.userData.email = action.payload.user.email
				localStorage.setItem("token", action.payload.token)
				localStorage.setItem("id", action.payload.user._id)
				localStorage.setItem("email", action.payload.user.email)
			}
			state.status = "ready"
		})


		builder.addCase(resetPasswordSendEmail.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(resetPasswordSendEmail.fulfilled, (state) => {
			state.status = "ready"
		})


		builder.addCase(resetPasswordNewPassword.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(resetPasswordNewPassword.fulfilled, (state) => {
			state.status = "ready"
		})


		builder.addCase(editProfile.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(editProfile.fulfilled, (state) => {
			state.status = "ready"
		})
	},
})

export const {
	setUserData,
	logout
} = authSlice.actions
export default authSlice.reducer