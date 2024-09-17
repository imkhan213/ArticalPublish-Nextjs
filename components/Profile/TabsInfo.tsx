import { FC, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"

import { editProfile, IUser } from "@/store/slices/auth-slice"
import InstitutionInfo from "../Auth/Sign_up/InstitutionInfo/InstitutionInfo"
import { useForm, UseFormRegister } from "react-hook-form"
import AuthInput from "../Auth/AuthInput"
import { useAppDispatch, useAppSelector, useAuth } from "@/hooks/redux-hooks"
import { reSearchInstitutesPositionsOptions, universityPositionsOptions } from "../Auth/Sign_up/InstitutionInfo/data"

interface ITabsInfo {
	userData: IUser
	getUserData: () => void
	profile: "my" | "not_my"
}

const TabsInfo: FC<ITabsInfo> = (props) => {
	const [isEditMode, setIsEditMode] = useState(false)

	return (
		<>
			{!isEditMode
				? <div className="bg-purple-50/90 p-3 rounded-lg">
					<div className="text-lg underline mb-2 font-semibold">{props.userData.firstName} {props.userData.lastName}</div>
					<div className="flex gap-1 mb-2">
						<h3 className="font-medium mb-1 items-center">Email:</h3>
						<div className="">{props.userData.email}</div>
					</div>
					<div className="">
						<h3 className="font-semibold flex gap-1 items-center mb-1">
							<FontAwesomeIcon icon={faGraduationCap} />
							Information about the institution:
						</h3>
						<div className="">
							<div className="">Institution: {props.userData.institutionInfo?.institutionName}</div>
							{props.userData.institutionInfo?.position
								? <div className="">Position: {props.userData.institutionInfo?.position}</div>
								: <div className="">Area of interest: {props.userData.institutionInfo?.areaOfInterest}</div>
							}
						</div>
					</div>
					
					<div className="">
						<h3 className="font-semibold flex gap-1 items-center mb-1">
							Stripe Payment Details
						</h3>
						<div className="">
							<div className="">Public Key: XXXXXXXXXX</div>
							<div className="">Secret Key: XXXXXXXXXX</div>
							
						</div>
					</div>
					
					{props.profile === 'my' &&
						<button
							onClick={() => setIsEditMode(true)}
							className="
								mt-4
								bg-main-blue/90
								hover:bg-main-blue/80
								text-white
								text-sm
								w-[130px]
								duration-500
								font-medium
								h-[28px]
								rounded-md
							"
						>
							Edit information
						</button>
					}
				</div>
				: <EditModal userData={props.userData} setIsEditMode={setIsEditMode} getUserData={props.getUserData} />
			}
		</>
	)
}

interface IEditProfileFormValues {
	firstName: string
	lastName: string
	email: string
	publicKey: string
	secretKey: string
}

const EditModal: FC<{ userData: IUser, setIsEditMode: (v: boolean) => void, getUserData: () => void }> = (props) => {
	const { status } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const { token } = useAuth()
	const [errors, setErrors] = useState<string[]>([])

	
	const getPosition = (institutionName: string, position: string) => {
		const filter1 = universityPositionsOptions.find(i => i.label === position)
		const filter2 = reSearchInstitutesPositionsOptions.find(i => i.label === position)
		
		if ((!filter1 && !filter2) && (institutionName === 'University' || institutionName === 'Research Institutes')) {
			return 'Specify other'
		}
		return position
	}
	
	const institutionInfo = props.userData.institutionInfo
	const [institution, setInstitution] = useState(institutionInfo.institutionName)
	const [position, setPosition] = useState({
		main: !institutionInfo.position ? '' : getPosition(institutionInfo.institutionName, institutionInfo.position),
		specifyOther: !institutionInfo.position ? '' : institutionInfo.position
	})
	const [areaOfInterest, setAreaOfInterest] = useState(
		!institutionInfo.areaOfInterest ? '' : institutionInfo.areaOfInterest
	)

	const {
		register,
		handleSubmit
	} = useForm<IEditProfileFormValues>({
		mode: "onSubmit"
	})

	const buttonStyles = `
		bg-main-blue/90
		hover:bg-main-blue/80
		disabled:bg-main-blue/80
		text-white
		px-5
		duration-500
		font-medium
		h-[28px]
		rounded-md
	`

	const onSubmit = handleSubmit((data) => {
		if (
			!institution.trim() ||
			(!position.main.trim() && !position.specifyOther.trim() && !areaOfInterest.trim()) ||
			(position.main === "Specify other" && !position.specifyOther.trim())
		) {
			setErrors(["Please fill in all fields"])
			return
		}

		if (token) {
			dispatch(editProfile({
				firstName: data.firstName.trim(),
				lastName: data.lastName.trim(),
				publicKey: (data.publicKey != '') ? data.publicKey.trim() : 'NA',
				secretKey: (data.publicKey != '') ? data.secretKey.trim() : 'NA',
				institution: institution.trim(),
				position: position.specifyOther.trim() ? position.specifyOther.trim() : position.main.trim(),
				areaOfInterest,
				token,
				setErrors,
				afterEditHandler() {
					props.getUserData()
				},
			}))
		}
	})

	return (
		<form
			onSubmit={onSubmit}
			noValidate
			autoComplete="off"
			className="w-[300px] min-[530px]:w-[460px] bg-white rounded-lg flex flex-col mt-4"
		>
			<div className="flex flex-col gap-1 my-4">
				{errors.map((err, i) => {
					return <div key={i} className="font-medium text-red-500">• {err}</div>
				})}
			</div>
			<EditModalName register={register} userData={props.userData} />
			<InstitutionInfo
				isEditProfile
				institution={institution}
				setInstitution={setInstitution}
				position={position}
				setPosition={setPosition}
				areaOfInterest={areaOfInterest}
				setAreaOfInterest={setAreaOfInterest}
			/>
			
			<EditModalStripe register={register} userData={props.userData} />
			
			<div className="flex gap-2 w-[84%] mt-5">
				<button
					onClick={() => props.setIsEditMode(false)}
					type="button"
					className={buttonStyles}
				>
					Cancel
				</button>
				<button
					disabled={status === 'pending'}
					className={buttonStyles}
				>
					Save
				</button>
			</div>
		</form>
	)
}

const EditModalName: FC<{ register: UseFormRegister<IEditProfileFormValues>, userData: IUser }> = (props) => {
	return (
		<div className="flex flex-col gap-2">
			<AuthInput
				inputTailwindStyles="h-[34px]"
				defaultValue={props.userData.firstName}
				isEditProfile
				label="First name"
				inputName="firstName"
				register={props.register}
			/>
			<AuthInput
				inputTailwindStyles="h-[34px]"
				defaultValue={props.userData.lastName}
				isEditProfile
				label="Last name"
				inputName="lastName"
				register={props.register}
			/>
		</div>
	)
}

const EditModalStripe: FC<{ register: UseFormRegister<IEditProfileFormValues>, userData: IUser }> = (props) => {
	return (
		<div className="flex flex-col gap-2">
			<AuthInput
				inputTailwindStyles="h-[34px]"
				defaultValue={props.userData.publicKey}
				isEditProfile
				label="Public Key"
				inputName="publicKey"
				register={props.register}
			/>
			<AuthInput
				inputTailwindStyles="h-[34px]"
				defaultValue={props.userData.secretKey}
				isEditProfile
				label="Secret Key"
				inputName="secretKey"
				register={props.register}
			/>
		</div>
	)
}

export default TabsInfo