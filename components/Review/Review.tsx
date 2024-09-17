import { useAppDispatch, useAuth } from "@/hooks/redux-hooks"
import { IArticle, reviewArticle } from "@/store/slices/article-slice"
import { logout } from "@/store/slices/auth-slice"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect, useState } from "react"
import Buttons from "./Buttons"
import FirstStep from "./steps/FirstStep"
import SecondStep from "./steps/SecondStep"
import ThirdStep from "./steps/ThirdStep"

export interface IFirstStep {
	isQualifiedResearche: null | boolean
	isWilling: null | boolean
	isSameResearchInstitution: null | boolean
	isWishesToProceed: null | boolean
}

export interface ISecondStep {
	review: string
	quality: string
	achievements: string
	// pricing: string
	potentialsOfDataset: string
	qualityOfDataset: string
	authenticityOfDataset: string
}

export interface IThirdStep {
	isThoroughReview: boolean | null
	isReadSources: boolean | null
	isCheckProofs: boolean | null
	isClearlyState: boolean | null
	isNotAgree: boolean | null
}

interface IReview {
	article: IArticle
}

const Review: FC<IReview> = (props) => {
	const [isDisabled, setIsDisabled] = useState(false)

	const router = useRouter()
	const { id, token } = useAuth()
	const dispatch = useAppDispatch()
	const [error, setError] = useState("")

	const [firstStep, setFirstStep] = useState({
		isQualifiedResearche: null,
		isWilling: null,
		isSameResearchInstitution: null,
		// isWishesToProceed: null
	} as IFirstStep)

	const [secondStep, setSecondStep] = useState({
		review: '',
		quality: '',
		achievements: '',
		// pricing: '',
		potentialsOfDataset: '',
		qualityOfDataset: '',
		authenticityOfDataset: '',

	} as ISecondStep)

	const [thirdStep, setThirdStep] = useState({
		isThoroughReview: null,
		isReadSources: null,
		isCheckProofs: null,
		isClearlyState: null,
		isNotAgree: null
	} as IThirdStep)

	const [currentStep, setCurrentStep] = useState(0)
	const steps = [
		{
			title: <>
				<div>Thanks for choosing to review this <a href={`/articles/${props.article._id}`} className="underline" target="_blank" rel="noreferrer">article</a>.</div>
				<div className="mt-2 text-lg">Please answer the following questions:</div>
			</>,
			component: <FirstStep article={props.article} firstStep={firstStep} setFirstStep={setFirstStep} />
		},
		{
			title: "Review",
			component: <SecondStep secondStep={secondStep} setSecondStep={setSecondStep} article={props.article} />
		},
		{
			title: <>
				<div>Thanks for conducting a review of this <a href={`/articles/${props.article._id}`} className="underline" target="_blank" rel="noreferrer">article</a>.</div>
				<div className="mt-2 text-lg">Before submitting your review, please answer the following questions:</div>
			</>,
			component: <ThirdStep article={props.article} thirdStep={thirdStep} setThirdStep={setThirdStep} />
		}
	]

	const backHandler = () => {
		setCurrentStep(currentStep - 1)
	}

	const nextHandler = () => {
		setError("")

		if (currentStep === 0 &&
			(firstStep.isQualifiedResearche === null ||
				firstStep.isWilling === null ||
				firstStep.isSameResearchInstitution === null
				// firstStep.isWishesToProceed === null
			)
		) {
			setError("Please answer all questions.")
			return
		}

		else if (currentStep === 0 &&
			(!firstStep.isQualifiedResearche || !firstStep.isWilling)
		) {
			setError("Sorry, but we are not inviting you to review the article.")
			return
		}

		else if (currentStep === 1 && (!secondStep.review || secondStep.review.length < 20)) {
			setError("Please write a review of at least 20 characters long.")
			return
		}

		if (currentStep === 1 && props.article.dataset.type &&
			(!secondStep.achievements ||
				!secondStep.quality ||
				// !secondStep.pricing ||
				!secondStep.qualityOfDataset ||
				!secondStep.authenticityOfDataset ||
				!secondStep.potentialsOfDataset
			)
		) {
			setError("Please answer all questions.")
			return
		}

		if (currentStep === 1 && !props.article.dataset.type && (!secondStep.achievements || !secondStep.quality)) {
			setError("Please answer all questions.")
			return
		}

		setCurrentStep(currentStep + 1)
	}

	const publishHandler = () => {
		setError("")

		if (
			!thirdStep.isThoroughReview ||
			!thirdStep.isReadSources ||
			!thirdStep.isCheckProofs ||
			!thirdStep.isClearlyState ||
			!thirdStep.isNotAgree
		) {
			setError("Please answer all questions and fulfill all requirements.")
			return
		}

		if (id && token) {
			setIsDisabled(true)
			dispatch(reviewArticle({
				articleId: props.article._id,
				userId: id,
				token,
				reviewData: secondStep,
				router,
				unauthorizatedHandler() {
					dispatch(logout({}))
					router.push("/auth/login_in")
				},
			}))
		}
	}

	return (
		<div className="bg-purple-50/70 w-[90%] mx-auto my-6 min-h-[90vh] p-5 rounded flex flex-col">
			<div className="mb-6">
				<h1 className="mb-4 text-xl">{steps[currentStep].title}</h1>
				{steps[currentStep].component}
			</div>
			<div className="mt-auto">
				{error && <div className="text-red-500 mb-2 font-medium">{error}</div>}
				{!error && currentStep === 2
					? <div className="mb-2">Thank you so much for reviewing. Click &quot;publish&quot; to publish your review. Published reviews are visible to the author and other users. It will also be associated to the reviewer&apos;s profile.</div>
					: null
				}
				<Buttons
					isDisabled={isDisabled}
					currentStep={currentStep}
					stepsLength={steps.length}
					backHandler={backHandler}
					nextHandler={nextHandler}
					publishHandler={publishHandler}
				/>
			</div>
		</div>
	)
}

export default Review