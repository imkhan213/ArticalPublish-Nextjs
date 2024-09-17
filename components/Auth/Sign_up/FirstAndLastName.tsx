import { FC } from "react"
import { UseFormRegister } from "react-hook-form/dist/types"
import AuthInput from "../AuthInput"
import { ISignUpFormValues } from "./Sign_up"

interface IFirstAndLastName {
	register: UseFormRegister<ISignUpFormValues>
}

const FirstAndLastName: FC<IFirstAndLastName> = (props) => {
	return (
		<div className="flex flex-col gap-2">
			<AuthInput
				label="First name"
				inputName="firstName"
				register={props.register}
			/>
			<AuthInput
				label="Last name"
				inputName="lastName"
				register={props.register}
			/>
		</div>
	)
}

export default FirstAndLastName