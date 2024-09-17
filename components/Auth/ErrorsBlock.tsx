import { NextPage } from "next"

export const ErrorsBlock: NextPage<{ errors: string[], containerStylesInTailwind?: string }> = (props) => {
	let updatedErros = props.errors.map(e => e.charAt(0).toUpperCase() + e.slice(1))

	return (
		<>
			{props.errors.length > 0
				? <div className={`w-[300px] min-[530px]:w-[460px] mx-auto mb-[30px] ${props.containerStylesInTailwind}`}>
					<h2 className="text-main-blue text-[18px] mb-[10px]">Please fix these errors</h2>
					<div className="flex flex-col gap-[10px]">
						{updatedErros.map((error, index) => <div key={index} className="bg-main-blue/10 text-red-500 font-semibold text-sm rounded-[7px] p-[4px_10px]">{error}</div>)}
					</div>
				</div>
				: null
			}
		</>
	)
}