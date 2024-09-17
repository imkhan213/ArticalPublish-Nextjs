import React from "react"
import { FC, Ref, useRef, useState } from "react"
import Select from "react-select"

import { institutionOptions, reSearchInstitutesPositionsOptions, universityPositionsOptions } from "./data"
import InstitutionInfoDoubleSelect from "./InstitutionInfoDoubleSelect"

interface IInstitutionName {
	isEditProfile?: boolean 

	institution: string
	position: {
		main: string
		specifyOther: string
	}
	areaOfInterest: string

	setInstitution: (v: string | ((v: string) => string)) => void
	setPosition: (v: any) => void
	setAreaOfInterest: (v: string | ((v: string) => string)) => void

	userform?: any
}

const InstitutionInfo: FC<IInstitutionName> = (props) => {

	const setInstitutionValue = (value: string) => {
		props.setAreaOfInterest("")
		props.setPosition({
			main: "",
			specifyOther: ""
		})
		props.setInstitution(value)
	}

	const setPositionValue = (value: string) => {
		props.setAreaOfInterest("")
		props.setPosition({
			main: value,
			specifyOther: ""
		})
	}

	return (
		<div className={`${props.isEditProfile ? '' : 'mx-auto'} ${props.userform ? '' : 'w-[84%]'} mt-2`}>
			<label className="font-semibold text-sm">Institution name</label>
			<CustomSelect
				defaultValue={props.institution}
				options={institutionOptions}
				placeholder="Institution name"
				setValue={setInstitutionValue}
				stylesInTailwind="mt-1"
			/>

			{props.institution === "University" &&
				<InstitutionInfoDoubleSelect
					options={universityPositionsOptions}
					position={props.position}
					setPosition={props.setPosition}
					setAreaOfInterest={props.setAreaOfInterest}
				/>
			}

			{props.institution === "Research Institutes" &&
				<InstitutionInfoDoubleSelect
					options={reSearchInstitutesPositionsOptions}
					position={props.position}
					setPosition={props.setPosition}
					setAreaOfInterest={props.setAreaOfInterest}
				/>
			}

			{props.institution === "I/O" &&
				<SelectInput
					label="Specify your job role in your Industry/Organization"
					text={props.position.main}
					setText={setPositionValue}
				/>
			}

			{props.institution === "Military" &&
				<SelectInput
					label="Please specify your rank"
					text={props.position.main}
					setText={setPositionValue}
				/>
			}

			{props.institution === "Independent Scholar" &&
				<SelectInput
					label="Specify your field of interest"
					text={props.areaOfInterest}
					setText={props.setAreaOfInterest}
				/>
			}
		</div>
	)
}

interface ICustomSelect {
	options: Array<{ value: string, label: string }>
	placeholder: string
	defaultValue: string
	setValue: (v: any) => void
	stylesInTailwind?: string
}

export const CustomSelect: FC<ICustomSelect> = (props) => {
	return (
		<Select
			options={props.options}
			className={props.stylesInTailwind}
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					border: "2px solid rgba(50,51,90,.7)",
					outline: "none",
					"&:hover": {
						border: "auto"
					}
				}),
			}}
			instanceId="custom-select"
			defaultValue={props.options.find(i => i.label === props.defaultValue)}
			placeholder={props.placeholder}
			onChange={(selectProps) => props.setValue(selectProps?.value!)}
		/>
	)
}

interface ISelectInput {
	label: string
	text: string
	setText: (v: any) => void
}

const SelectInput: FC<ISelectInput> = (props) => {
	return (
		<div className="flex flex-col mt-3">
			<label className="font-semibold text-sm mb-1">{props.label}</label>
			<input
				type="text"
				value={props.text}
				onChange={(e) => props.setText(e.currentTarget.value)}
				className="
					border-2
					border-main-blue/70
					rounded-[4px]
					px-2
					h-[30px]
				"
			/>
		</div>
	)
}

export default React.memo(InstitutionInfo)