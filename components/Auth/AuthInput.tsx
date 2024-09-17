import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

interface IAuthInput {
	defaultValue?: string
	isEditProfile?: boolean
	label: string
	inputName: "firstName" | "lastName" | "email" | "password" | "confirmPassword" | "secretKey" | "publicKey"
	register: UseFormRegister<any>
	inputTailwindStyles?: string
}

const AuthInput: FC<IAuthInput> = (props) => {
	return (
		<div className={`${props.isEditProfile ? '' : 'mx-auto'} flex flex-col w-[84%]`}>
			<label
				htmlFor={props.inputName}
				className="font-semibold mb-1 text-sm"
			>
				{props.label}
			</label>
			<input 
				defaultValue={props.defaultValue}
				id={props.inputName} 
				type={props.inputName === "password" || props.inputName === "confirmPassword" ? "password" : "text"} 
				{...props.register(props.inputName, {
					required:  (props.inputName === "publicKey" || props.inputName === "secretKey") ? false : true
				})} 
				className={`
					border-2
					border-main-blue/70
					rounded-[4px]
					px-2
					h-[30px]
					${props.inputTailwindStyles}
				`}
			/>
		</div >
	)
}

export default AuthInput