import { IArticle } from "@/store/slices/article-slice"
import { FC } from "react"
import { ArticlesItem } from "./TabsArticles"

interface ITabsReviews {
	reviews: IArticle[]
}

const TabsReviews: FC<ITabsReviews> = (props) => {
	return (
		<div className="">
			<div className="flex flex-col gap-5 mt-6 flex-wrap | min-[900px]:flex-row">
				{props.reviews.map(item => <ArticlesItem key={item._id} item={item} reviewpage={true} />)}
			</div>
		</div>
	)
}

export default TabsReviews