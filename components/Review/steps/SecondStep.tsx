import { IArticle } from "@/store/slices/article-slice"
import { FC } from "react"
import Choice from "../Choice"
import { ISecondStep } from "../Review"

interface ISecondStepComponent {
	secondStep: ISecondStep
	setSecondStep: (v: ISecondStep | ((v: ISecondStep) => ISecondStep)) => void

	article: IArticle
}

const SecondStep: FC<ISecondStepComponent> = (props) => {

	return (
		<div className="flex flex-col gap-7">
			<SecondStepReview
				text={props.secondStep.review}
				setText={(text: string) => props.setSecondStep({ ...props.secondStep, review: text })}
			/>
			<Choice
				mode="vertical"
				options={[
					{ label: 'Citable without needing further change', value: 'Citable without needing further change' },
					{ label: 'Mostly correct with some minor issues to address', value: 'Mostly correct with some minor issues to address' },
					{ label: 'Has some useful parts but with identifiable flaws', value: 'Has some useful parts but with identifiable flaws' },
					{ label: 'Not citable', value: 'Not citable' }
				]}
				title='Regarding the quality of the paper, I think it is:'
				value={props.secondStep.quality}
				setValue={(value: string) => props.setSecondStep({ ...props.secondStep, quality: value })}
				hint={null}
			/>
			<Choice
				mode="vertical"
				options={[
					{ label: 'Achieved exactly what it claimed to have done', value: 'Achieved exactly what it claimed to have done' },
					{ label: 'Achieved partly what it claimed to have done', value: 'Achieved partly what it claimed to have done' },
					{ label: 'Achieved something else than what it claimed to have achieved', value: 'Achieved something else than what it claimed to have achieved' },
					{ label: 'Didn\'t provide much new achievements', value: 'Didn\'t provide much new achievements' }
				]}
				title='Regarding the achievement(s) of the paper, I think it:'
				value={props.secondStep.achievements}
				setValue={(value: string) => props.setSecondStep({ ...props.secondStep, achievements: value })}
				hint={null}
			/>
			{/* <Choice
				mode="vertical"
				options={[
					{ label: 'A rare steal', value: 'A rare steal' },
					{ label: 'Worth it', value: 'Worth it' },
					{ label: 'A bit pricy', value: 'A bit pricy' },
					{ label: 'Too pricy', value: 'Too pricy' },
					{ label: 'Not worth the price at all', value: 'Not worth the price at all' },
				]}
				title='Regarding the pricing of the paper, I think it is:'
				value={props.secondStep.pricing}
				setValue={(value: string) => props.setSecondStep({ ...props.secondStep, pricing: value })}
				hint={null}
			/> */}
			{props.article.dataset.type
				? <>
					<Choice
						mode="vertical"
						options={[
							{ label: 'Has more things to be explored and analyzed', value: 'Has more things to be explored and analyzed' },
							{ label: 'has little use outside the scope of this research paper', value: 'has little use outside the scope of this research paper' }
						]}
						title='Regarding the potentials of the dataset, I think the dataset:'
						value={props.secondStep.potentialsOfDataset}
						setValue={(value: string) => props.setSecondStep({ ...props.secondStep, potentialsOfDataset: value })}
						hint={null}
					/>
					<Choice
						mode="vertical"
						options={[
							{ label: 'Is well organized and needs little cleaning and processing', value: 'Is well organized and needs little cleaning and processing' },
							{ label: 'Is messy and needs much cleaning and processing for others to use', value: 'Is messy and needs much cleaning and processing for others to use' }
						]}
						title='Regarding the quality of the dataset, I think the dataset:'
						value={props.secondStep.qualityOfDataset}
						setValue={(value: string) => props.setSecondStep({ ...props.secondStep, qualityOfDataset: value })}
						hint={null}
					/>
					<Choice
						mode="vertical"
						options={[
							{ label: 'Is collected in a scientific manner and highly credible', value: 'Is collected in a scientific manner and highly credible' },
							{ label: 'Shows questionable features that are rarely observed in other datasets I deal with', value: 'Shows questionable features that are rarely observed in other datasets I deal with' }
						]}
						title='Regarding the authenticity of the dataset, I think the dataset:'
						value={props.secondStep.authenticityOfDataset}
						setValue={(value: string) => props.setSecondStep({ ...props.secondStep, authenticityOfDataset: value })}
						hint={null}
					/>
				</>
				: null
			}
		</div>
	)
}

const SecondStepReview: FC<{ text: string, setText: (text: string) => void }> = (props) => {
	return (
		<div className="">
			<h3 className="font-medium mb-3">Please write your review below in the text box</h3>
			<textarea
				value={props.text}
				onChange={e => props.setText(e.currentTarget.value)}
				className='
					resize-none
					w-[280px]
					h-[120px]
					border-2
					border-main-blue
					rounded
					px-2
					py-1
				'
			/>
		</div>
	)
}

export default SecondStep