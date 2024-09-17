import { instance } from "@/components/Layout";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./auth-slice";

interface IGetArticles {
	limit: number
	offset: number
	title: string
	authors: string
	keywords: string
	date: string
}

export const getArticles = createAsyncThunk(
	"article/getArticles",
	async (data: IGetArticles) => {
		const resp = await instance.get<{ items: IArticle[], totalCount: number }>(
			`pubs
				?offset=${data.offset}
				&limit=${data.limit}
				&title=${data.title}
				&authors=${data.authors}
				&keywords=${data.keywords}
				&date=${data.date}
			`
		)

		return resp.data
	}
)

export const getArticleById = async (id: string): Promise<IArticle | null> => {
	const resp = await instance.get(`pubs/${id}`)
	return resp.data
}

interface ICreateArticle {
	articleData: {
		owner: string
		title: string
		createDate: string
		authors: string[]
		keywords: string[]
		paperField: string
		paperAbstract: string
		dataAbstract: string
		dataPrice: string
		Scanid?: string
		file: string
		dataset: {
			type: "external_file_link" | "file_link" | null
			link: string | null
		}
	}
	token: string
	router: any
	unauthorizatedHandler: () => void
}

interface ICreateOrder {
	orderData: {
		userid: string,
		owneremail: string,
		pubsid: string,
		createDate: string,
		txnid: string
	}
	token: string
	router: any
	unauthorizatedHandler: () => void
}

interface ICreateSubscription {
	orderData: {
		userid: string,
		subscriptionid: string,
		priceId: string,
		price: string,
		customerid: string,
		status: any,
		start_date: any,
		end_date: any,
		createDate: string
	}
	token: string
	router: any
	unauthorizatedHandler: () => void
}

export async function getOrders(userId: any) {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/orders/${userId}`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	// Handle errors based on the response status
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export async function getPlagiarismScore(Scanid: any) {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/webhook/${Scanid}`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	// Handle errors based on the response status
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}


export async function checkarticalOrder(articalid: any, userId: any) {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/orders/checkorder/${articalid}/${userId}`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export async function getScans() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/webhook`;
  	const response = await fetch(apiUrl);
  	if (!response.ok) {
    	
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export async function getArtlist() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/pubs/?offset=1&limit=100&title=&authors=&keywords=&date=`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	// Handle errors based on the response status
    	throw new Error('Failed to fetch details');
  	}
  	return response.json();
}

export async function getSubscription(userId: any) {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/subscription/${userId}`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch details');
  	}
  	return response.json();
}

export async function getAllsubscription() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/subscription/getallsubscription`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch subscription');
  	}
  	return response.json();
}

export const createArticle = createAsyncThunk(
	"article/createArticle",
	async (data: ICreateArticle) => {
		try {
			const resp = await instance.post<IUser>("pubs", data.articleData, {
				headers: {
					authorization: `Bearer ${data.token}`
				}
			})
			data.router.push(`/articles/${resp.data._id}`)
			return
		} catch (err: any) {
			if (err.response.data.error === "Unauthorized") {
				data.unauthorizatedHandler()
			}
		}
	}
)

export const createOrder = createAsyncThunk(
	"article/createOrder",
	async (data: ICreateOrder) => {
		
		try {
			const resp = await instance.post("orders", data.orderData, {
				headers: {
					authorization: `Bearer ${data.token}`
				}
			})
			data.router.push(`/profile`)
			
			return
		} catch (err: any) {
			if (err.response.data.error === "Unauthorized") {
				data.unauthorizatedHandler()
			}
		}
	}
)

export const storeSubscription = createAsyncThunk(
	"subscription/storeSubscription",
	async (data: ICreateSubscription) => {
		
		try {
			const resp = await instance.post("subscription", data.orderData, {
				headers: {
					authorization: `Bearer ${data.token}`
				}
			})
			data.router.push(`/profile`)
			
			return
		} catch (err: any) {
			if (err.response.data.error === "Unauthorized") {
				data.unauthorizatedHandler()
			}
		}
	}
)

export const uploadFile = async (formData: FormData, token: string, unauthorizatedHandler: () => void, isExcel?: boolean) => {
	try {
		const resp = await instance.post<{ fileUrl: string }>(`pubs/upload-article-file${isExcel ? '?type=excel' : ''}`, formData, {
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		return resp.data.fileUrl
	} catch (err: any) {
		if (err.response.data.error === "Unauthorized") {
			unauthorizatedHandler()
		}
	}
}

interface IEditArticle {
	articleData: {
		keywords: string[]
		paperAbstract: string
		dataAbstract: string
		dataPrice?: string
		file?: string
		Scanid?: string
	}
	articleId: string
	token: string
	router: any
	unauthorizatedHandler: () => void
}

export const updateDocs = createAsyncThunk(
	"article/updateArticle",
	async (data: any) => {
		try {
			const resp = await instance.put('pubs/updatedoc', {
				id: data.articleId,
				...data.articleData
			}, {
				headers: {
					authorization: `Bearer ${data.token}`
				}
			})

			data.router.push(`/articles/${resp.data._id}`)
		} catch (err: any) {
			if (err.response.data.error === "Unauthorized") {
				data.unauthorizatedHandler()
			}
		}
	}
)

export const editArticle = createAsyncThunk(
	"article/editArticle",
	async (data: IEditArticle) => {
		try {
			const resp = await instance.put('pubs', {
				id: data.articleId,
				...data.articleData
			}, {
				headers: {
					authorization: `Bearer ${data.token}`
				}
			})

			data.router.push(`/articles/${resp.data._id}`)
		} catch (err: any) {
			if (err.response.data.error === "Unauthorized") {
				data.unauthorizatedHandler()
			}
		}
	}
)

interface IReviewArticle {
	reviewData: {
		review: string
		quality: string
		achievements: string
		// pricing: string
		potentialsOfDataset: string
		qualityOfDataset: string
		authenticityOfDataset: string
	}

	userId: string
	articleId: string
	token: string
	router: any
	unauthorizatedHandler: () => void
}

export const reviewArticle = createAsyncThunk(
	"article/reviewArticle",
	async (data: IReviewArticle) => {
		try {
			await instance.post('review',
				{
					user: data.userId,
					article: data.articleId,
					...data.reviewData
				},
				{
					headers: {
						authorization: `Bearer ${data.token}`
					}
				}
			)

			data.router.push(`/articles/${data.articleId}`)
		} catch (err: any) {
			if (err.response.data.error === "Unauthorized") {
				data.unauthorizatedHandler()
			}
		}
	}
)

export interface IReview {
	_id: string
	user: IUser | string
	article: IArticle
	review: string
	quality: string
	achievements: string
	potentialsOfDataset: string
	qualityOfDataset: string
	authenticityOfDataset: string
}

export interface IArticle {
	_id: string
	owner: IUser
	createDate: string
	title: string
	authors: IUser[]
	unregisteredAuthors: string[]
	keywords: string[]
	plagiarismHold: boolean
	paperField: string
	paperAbstract: string
	dataAbstract: string
	dataPrice: string
	dataset: {
		type: "external_file_link" | "file_link" | null
		link: string | null
	}
	file: string
	reviewers: IUser[]
	reviews: IReview[]
	Scanid?: string
	is_deleted: any
}

const initialState = {
	status: "",
	articles: {
		items: [] as IArticle[],
		totalCount: 0
	}
}

const articleSlice = createSlice({
	name: "acticle",
	initialState,
	reducers: {
		setArticles(state, action: PayloadAction<IArticle[]>) {
			state.articles.items = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(createArticle.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(createArticle.fulfilled, (state) => {
			state.status = "ready"
		})

		builder.addCase(editArticle.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(editArticle.fulfilled, (state) => {
			state.status = "ready"
		})


		builder.addCase(getArticles.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(getArticles.fulfilled, (state, action) => {
			if (state.articles.items.length > 0) {
				state.articles.items = [...state.articles.items, ...action.payload.items]
			} else {
				state.articles.items = action.payload.items
			}
			state.articles.totalCount = action.payload.totalCount
			state.status = "ready"
		})


		builder.addCase(reviewArticle.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(reviewArticle.fulfilled, (state) => {
			state.status = "ready"
		})
	},
})

export const {
	setArticles
} = articleSlice.actions
export default articleSlice.reducer