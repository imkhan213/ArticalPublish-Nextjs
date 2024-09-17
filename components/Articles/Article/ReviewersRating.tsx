import { IReview } from "@/store/slices/article-slice"
import { IUser } from "@/store/slices/auth-slice"
import Link from "next/link"
import { FC } from "react"

const variants = [
	{
		title: 'Regarding the quality of the paper, I think it is:',
		items: [
			'Citable without needing further change',
			'Mostly correct with some minor issues to address',
			'Has some useful parts but with identifiable flaws',
			'Not citable'
		],
		fieldName: 'quality'
	},
	{
		title: 'Regarding the achievement(s) of the paper, I think it:',
		items: [
			'Achieved exactly what it claimed to have done',
			'Achieved partly what it claimed to have done',
			'Achieved something else than what it claimed to have achieved',
			'Didn\'t provide much new achievements'
		],
		fieldName: 'achievements'
	},
	// {
	// 	title: 'Regarding the pricing of the paper, I think it is:',
	// 	items: [
	// 		'A rare steal',
	// 		'Worth it',
	// 		'A bit pricy',
	// 		'Too pricy',
	// 		'Not worth the price at all'
	// 	],
	// 	fieldName: 'pricing'
	// },
	{
		title: 'Regarding the potentials of the dataset(s), I think the dataset(s):',
		items: [
			'Has more things to be explored and analyzed',
			'Has little use outside the scope of this research paper'
		],
		fieldName: 'potentialsOfDataset'
	},
	{
		title: 'Regarding the quality of the dataset, I think it:',
		items: [
			'Is well organized and needs little cleaning and processing',
			'Is messy and needs much cleaning and processing for others to use'
		],
		fieldName: 'qualityOfDataset'
	},
	{
		title: 'Regarding the authenticity of the dataset, I think the dataset:',
		items: [
			'Is collected in a scientific manner and highly credible',
			'Shows questionable features that are rarely observed in other datasets I dealt with'
		],
		fieldName: 'authenticityOfDataset'
	},

]

const ReviewersRating: FC<{ reviews: IReview[], isDataset: boolean }> = (props) => {
	return (
		<div className="">
			<div className="text-xl font-medium mt-6 mb-2">Reviewers ratings of Paper:</div>
			<div className=" w-full max-h-[800px] overflow-auto | md:w-[70%] pr-1">
				<ReviewersRatingSection
					reviews={props.reviews}
					variantsIndex={0}
				/>
				<ReviewersRatingSection
					reviews={props.reviews}
					variantsIndex={1}
				/>
				{/* <ReviewersRatingSection
					reviews={props.reviews}
					variantsIndex={2}
				/> */}
			</div>
			{props.isDataset &&
				<>
					<div className="text-xl font-medium mt-6 mb-2">Reviewers ratings of Dataset(s):</div>
					<div className="w-full max-h-[800px] overflow-auto | md:w-[70%] pr-1">
						<ReviewersRatingSection
							reviews={props.reviews}
							variantsIndex={2}
						/>
						<ReviewersRatingSection
							reviews={props.reviews}
							variantsIndex={3}
						/>
						<ReviewersRatingSection
							reviews={props.reviews}
							variantsIndex={4}
						/>
					</div>
				</>
			}
		</div>
	)
}

const ReviewersRatingSection: FC<{ reviews: IReview[], variantsIndex: number }> = (props) => {
	return (
		<div className="mt-2">
			<div className="p-2 border-2 border-main-blue rounded-sm mb-2 font-semibold">{variants[props.variantsIndex].title}</div>
			<div className="flex flex-col gap-1">
				{props.reviews.map(review => {
					return (
						<div key={review._id} className={`flex gap-2 ${variants[props.variantsIndex].items.length === 2 ? 'min-h-[70px]' : 'min-h-[150px]'}`}>
							<Link href={`/profile/${(review.user as IUser)?._id}`} className="border-2 border-main-blue rounded-sm p-2 min-w-[100px] underline text-wrap">
								{`${(review.user as IUser)?.firstName} ${(review.user as IUser)?.lastName}`}
							</Link>
							<div className="flex flex-col gap-1 border-2 border-main-blue rounded-sm p-2 w-full">
								{variants[props.variantsIndex].items.map((v, i) => {
									return <div key={i} className={(review as any)[variants[props.variantsIndex].fieldName] === v ? 'font-semibold' : ''}>{v}</div>
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ReviewersRating