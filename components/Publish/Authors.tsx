import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, forwardRef, useRef, useState } from "react"

interface IAuthors {
	authors: string[]
	setAuthors: (authors: string[] | ((authors: string[]) => string[])) => void
}

const Authors: FC<IAuthors> = (props) => {
	const ref = useRef<HTMLInputElement>(null)
	const [error, setError] = useState("")

	const addAuthor = () => {
		setError("")

		let email = ref.current?.value.trim()

		if (!email) {
			ref.current?.focus()
			return
		}

		const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (!reg.test(email)) {
			setError("Enter the correct email")
			return
		}

		if (props.authors.includes(email)) {
			setError("You have already added this author")
			return
		}

		props.setAuthors((prev) => [...prev, (email as string)])
		ref.current!.value = ""
	}

	return (
		<div className="mt-6">
			<div className="md:text-lg mb-3">Please enter the email addresses of the authors*</div>
			<ItemsContainer items={props.authors} setItems={props.setAuthors} />
			<ItemsForm ref={ref} addItem={addAuthor} />
			{error
				? <div className="mt-1 text-sm text-red-500">{error}</div>
				: null
			}
		</div>
	)
}

interface IItemsContainer {
	items: string[]
	setItems: (authors: string[] | ((authors: string[]) => string[])) => void
}

export const ItemsContainer: FC<IItemsContainer> = (props) => {
	return (
		<div className="bg-main-blue/10 max-w-[400px] min-h-[50px] rounded-md flex flex-wrap gap-1 p-1 items-start">
			{props.items.map((item, index) => {
				return (
					<div key={index} className="px-2 py-1 text-sm rounded bg-white/80 flex gap-[6px] items-center">
						{item}
						<FontAwesomeIcon
							icon={faXmark}
							className="text-xs text-red-500 mt-[3px] cursor-pointer"
							onClick={() => props.setItems((prev) => prev.filter(i => i !== item))}
						/>
					</div>
				)
			})}
		</div>
	)
}

const ItemsFormCont = (props: { ref: any, addItem: () => void }, ref: any) => {
	return (
		<div className="h-[26px] flex items-center gap-2 mt-4">
			<input
				ref={ref}
				type="text"
				className="w-[180px] h-full border-2 border-main-blue rounded px-1"
				onKeyDown={(e) => { e.key === "Enter" && props.addItem() }}
			/>
			<button
				className="text-white w-[70px] h-full bg-main-blue hover:bg-main-blue/90 rounded duration-500"
				onClick={props.addItem}
			>
				Add
			</button>
		</div>
	)
}

export const ItemsForm = forwardRef(ItemsFormCont)

export default Authors