import Article from "@/components/Articles/Article/Article"
import CustomHead from "@/components/CustomHead"
import GlobalPreloader from "@/components/GlobalPreloader"
import Header from "@/components/Header"
import { getArticleById, IArticle } from "@/store/slices/article-slice"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const ArticlePage: NextPage = () => {
	const router = useRouter()

	const [article, setArticle] = useState<IArticle | null>(null)

	useEffect(() => {
		const getArticle = async () => {
			const article = await getArticleById(router.query.id as string)

			if (article) {
				setArticle(article)
			} else {
				router.push('/404')
			}
		}

		if (router.query.id) {
			getArticle()
		}
	}, [router.query.id])

	if (!article) return <GlobalPreloader />
	return (
		<div className="">
			<CustomHead title={article.title} metaDesc={article.title} />
			<Header />
			<Article article={article} />
		</div>
	)
}

export default ArticlePage 