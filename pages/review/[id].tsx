import CustomHead from "@/components/CustomHead"
import { useEffect, useState } from "react"

import { getArticleById, IArticle, checkarticalOrder } from "@/store/slices/article-slice"
import GlobalPreloader from "@/components/GlobalPreloader"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import { useAppDispatch, useAuth } from "@/hooks/redux-hooks"
import Review from "@/components/Review/Review"
import { checkUser, logout } from "@/store/slices/auth-slice"

const ReviewPage = () => {
	const dispatch = useAppDispatch()
	const { query, push } = useRouter()
	const { token, id } = useAuth()
	const [article, setArticle] = useState<IArticle | null>(null)

	useEffect(() => {
		if (typeof localStorage !== "undefined" && !localStorage.getItem('token')) {
			dispatch(logout({}))
			push("/auth/login_in")
		}

		const getArticle = async () => {
			const article = await getArticleById(query.id as string)
			if (!article) {
				push('/404')
			} else {
				setArticle(article)

				let dprice = parseFloat(article.dataPrice); 	
				if(dprice > 0){
					checkarticalOrder(query.id,id).then(resp => {
						if(resp < 1){
							push("/articles/"+query.id)
						}
					});
				}
			}
		}

		if (query.id && token) {
			getArticle()
		}
	}, [query.id, token])

	if (!article) return <GlobalPreloader />
	return (
		<div className="">
			<CustomHead title="Review page" metaDesc="Review page" />
			<Header />
			{article.owner === id || article.authors.some(i => i._id === id)
				? <div className="h-[90vh] flex justify-center items-center text-center mx-2 text-lg">
					Unfortunately, you cannot review an article if you are the author or owner of that article
				</div>
				: article.reviewers.some(i => i._id === id)
					? <div className="h-[90vh] flex justify-center items-center text-center mx-2 text-lg">
						You can only review an article once
					</div>
					: <Review article={article} />
			}
		</div>
	)
}

export default ReviewPage