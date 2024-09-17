import { FC } from "react"

interface IButtons {
	isDisabled: boolean
	stepsLength: number
	currentStep: number
	backHandler: () => void
	nextHandler: () => void
	publishHandler: () => void
}

const Buttons: FC<IButtons> = (props) => {
	const buttonStyles = `
		bg-main-blue hover:bg-main-blue/90 disabled:bg-main-blue/80 text-white
		duration-500
		rounded
		h-7
		w-[60px]
		min-[530px]:w-[80px]
		text-sm
		min-[530px]:text-base
		py-[4px]
		flex justify-center items-center
	`

	return (
		<div className="flex gap-2 items-center">
			{props.currentStep !== 0 &&
				<button
					className={buttonStyles}
					onClick={props.backHandler}
				>
					Back
				</button>
			}
			{props.currentStep !== props.stepsLength - 1 &&
				<button
					className={buttonStyles}
					onClick={props.nextHandler}
				>
					Next
				</button>
			}
			{props.currentStep === props.stepsLength - 1 &&
				<button
					disabled={props.isDisabled}
					className={buttonStyles}
					onClick={props.publishHandler}
				>
					Publish
				</button>
			}
		</div>
	)
}

export default Buttons