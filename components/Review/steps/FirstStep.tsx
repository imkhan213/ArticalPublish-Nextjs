import { FC } from "react"

import { IArticle } from "@/store/slices/article-slice"
import Choice from "../Choice"
import { IFirstStep } from "../Review"

interface IFirstStepComponent {
	article: IArticle
	firstStep: IFirstStep
	setFirstStep: (v: IFirstStep | ((v: IFirstStep) => IFirstStep)) => void
}

const FirstStep: FC<IFirstStepComponent> = (props) => {

	const options = [
		{ value: true, label: 'Yes' },
		{ value: false, label: 'No' },
	]

	return (
		<div className="flex flex-col gap-7">
			<Choice
				title={`The author(s) of the research specified that the research is in the field/subfield of ${props.article.paperField}, do you consider yourself a sufficiently qualified researcher in the specified field?`}
				options={options}
				value={props.firstStep.isQualifiedResearche}
				setValue={(value: boolean) => props.setFirstStep({ ...props.firstStep, isQualifiedResearche: value })}
				hint={{
					hintTitle: 'Click here to see what sufficiently qualified means',
					hintPopupText: 'Already have all the background knowledge to review this paper or can acquire necessary knowledge with little effort.'
				}}
			/>
			<Choice
				title={`Are you willing to give a full honest review of the research?`}
				options={options}
				value={props.firstStep.isWilling}
				setValue={(value: boolean) => props.setFirstStep({ ...props.firstStep, isWilling: value })}
				hint={{
					hintTitle: 'Click here to see what a full honest review means',
					hintPopupText: 'Reviewer has read and understood the full paper, reviewed the authenticity of the paper\'s evidence, data, citations, assumptions, logical groundings; reviewed the validity of the method and logic the author used to come to conclusions from the evidence, reviewed the conclusions and have provided evaluations.'
				}}
			/>
			<Choice
				title={`Are you in the same research institution as the author of the research?`}
				options={options}
				value={props.firstStep.isSameResearchInstitution}
				setValue={(value: boolean) => props.setFirstStep({ ...props.firstStep, isSameResearchInstitution: value })}
				hint={null}
			/>
			{/* <Choice
				title={`Based on your answers to the screening questions, we recommend / do not recommend you to review this paper. Do you wish to proceed to the reviewing process? `}
				options={options}
				value={props.firstStep.isWishesToProceed}
				setValue={(value: boolean) => props.setFirstStep({ ...props.firstStep, isWishesToProceed: value })}
				hint={null}
			/> */}
		</div>
	)
}

export default FirstStep