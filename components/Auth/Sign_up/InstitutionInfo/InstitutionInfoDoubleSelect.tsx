import { FC } from "react"
import { reSearchInstitutesPositionsOptions } from "./data"
import { CustomSelect } from "./InstitutionInfo"

interface IInstitutionInfoDoubleSelect {
	options: Array<{ value: string, label: string }>
	position: {
		main: string
		specifyOther: string
	};
	setPosition: (v: any) => void
	setAreaOfInterest: (v: any) => void
}

const InstitutionInfoDoubleSelect: FC<IInstitutionInfoDoubleSelect> = (props) => {
	const setValue = (value: string) => {
		props.setAreaOfInterest("")
		props.setPosition({
			main: value,
			specifyOther: ""
		})
	}

	return (
		<div className="mt-2">
			<label className="font-semibold text-sm">Position</label>
			<CustomSelect
				defaultValue={props.position.main}
				options={props.options}
				placeholder="Position"
				setValue={setValue} 
				stylesInTailwind="mt-1"
			/>
			{props.position.main === "Specify other" &&
				<div className="mt-2">
					<label className="font-semibold text-sm mb-1">Other</label>
					<input
						type="text"
						value={props.position.specifyOther}
						onChange={(e) => props.setPosition({ ...props.position, specifyOther: e.currentTarget.value })}
						className="
							w-full
							border-2
							border-main-blue/70
							rounded-[4px]
							px-2
							h-[30px]
						"
					/>
				</div>
			}
		</div>
	)
}

export default InstitutionInfoDoubleSelect