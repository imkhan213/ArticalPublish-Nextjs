import { IArticle } from "@/store/slices/article-slice"
import { FC } from "react"
import Choice from "../Choice"
import { IThirdStep } from "../Review"

interface ITrirdStepComponent {
	article: IArticle
	thirdStep: IThirdStep
	setThirdStep: (v: IThirdStep | ((v: IThirdStep) => IThirdStep)) => void
}

const ThirdStep: FC<ITrirdStepComponent> = (props) => {
	const options = [
		{ value: true, label: 'Yes' },
		{ value: false, label: 'No' },
	]

	return (
		<div className="flex flex-col gap-7">
			<Choice
				title='Have you conducted a thorough review?'
				options={options}
				error={props.thirdStep.isThoroughReview === false ? 'Please conduct a thorough review before submitting review. Your review will be public and permanently associated with the paper once submitted.' : ''}
				value={props.thirdStep.isThoroughReview}
				setValue={(value: boolean) => props.setThirdStep({ ...props.thirdStep, isThoroughReview: value })}
				hint={{
					hintTitle: 'Click here to see what thorough review means',
					hintPopupText: 'Have read and understood the full paper, reviewed the authenticity of the paper\'s evidence, data, citations; reviewed the validity of the method and logic the author used to come to conclusions from the evidence, reviewed the conclusions and have provided evaluations.'
				}}
			/>
			<Choice
				title={'Have you read an adequate number of the paper\'s citations or equivalent sources?'}
				options={options}
				error={props.thirdStep.isReadSources === false ? 'Please do this before submitting review.' : ''}
				value={props.thirdStep.isReadSources}
				setValue={(value: boolean) => props.setThirdStep({ ...props.thirdStep, isReadSources: value })}
				hint={{
					hintTitle: 'Click here to see what adequate number means',
					hintPopupText: 'An adequately read reviewer has read enough to gain the same background knowledge as the author on the topic of the paper. E.g. The author used a kind of method from a textbook, the reviewer needs to already understand that method or have read the full cited text and learned its content in order to review the paper.'
				}}
			/>
			<Choice
				title={props.article.dataset.type
					? 'Did you try to replicate the author\'s analysis using the dataset the author provided?'
					: 'Did you check the author\'s reasoning, logic, and proofs?'
				}
				options={options}
				error={props.thirdStep.isCheckProofs === false ? 'Please conduct this before submitting review.' : ''}
				value={props.thirdStep.isCheckProofs}
				setValue={(value: boolean) => props.setThirdStep({ ...props.thirdStep, isCheckProofs: value })}
				hint={null}
			/>
			<Choice
				title={'Did you clearly state in your review whether you agree, partially agree, or disagree with the author\'s conclusions?'}
				options={options}
				error={props.thirdStep.isClearlyState === false ? 'Please conduct this before submitting review.' : ''}
				value={props.thirdStep.isClearlyState}
				setValue={(value: boolean) => props.setThirdStep({ ...props.thirdStep, isClearlyState: value })}
				hint={null}
			/>
			<Choice
				mode="vertical"
				title={'If you did not fully agree with the author\'s conclusion, did you point out where you disagreed and/or demonstrate your version of the analysis/solution?'}
				options={[
					{ label: 'Yes, I did / I fully agreed with the author', value: true },
					{ label: 'No, I did not', value: false },
				]}
				error={props.thirdStep.isNotAgree === false ? 'Please do this before submitting review.' : ''}
				value={props.thirdStep.isNotAgree}
				setValue={(value: boolean) => props.setThirdStep({ ...props.thirdStep, isNotAgree: value })}
				hint={null}
			/>
		</div>
	)
}

export default ThirdStep