import { IReview } from "@/store/slices/article-slice"
import { IUser } from "@/store/slices/auth-slice"
import { Divider } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

const Reviews: FC<{ reviews: IReview[] }> = (props) => {

	return (
		<div className="">
			<div className="mb-3 text-center text-xl">Reviews</div>
			{props.reviews.length > 0
				? <div className="flex flex-wrap gap-4 max-h-[400px] overflow-auto">
					{props.reviews.map(item => {
						return (
							<div
								key={item._id}
								className="
									bg-white
									rounded-md
									p-2
									max-w-[400px]
									text-wrap
								"
							>
								<Link href={`/profile/${(item.user as IUser)?._id}`} className="font-medium underline text-main-blue">
									{`${(item.user as IUser)?.firstName} ${(item.user as IUser)?.lastName}`}
								</Link>
								<Divider />
								{item.review}
							</div>
						)
					})}
				</div>
				: <div className="text-center mt-8 text-[silver]">No one has reviewed this article yet</div>
			}
		</div>
	)
}

export default Reviews