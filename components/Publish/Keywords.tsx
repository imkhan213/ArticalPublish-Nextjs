import { FC, useRef, useState } from "react"
import { ItemsContainer, ItemsForm } from "./Authors"

interface IKeywords {
	keywords: string[]
	setKeywords: (authors: string[] | ((authors: string[]) => string[])) => void
}

const Keywords: FC<IKeywords> = (props) => {
	const ref = useRef<HTMLInputElement>(null)
	const [error, setError] = useState("")

	const addKeyword = () => {
		setError("")

		let keyword = ref.current?.value.trim()

		if (!keyword) {
			ref.current?.focus()
			return
		}

		if (props.keywords.includes(keyword)) {
			setError("You have already added this keyword")
			return
		}

		props.setKeywords((prev) => [...prev, (keyword as string)])
		ref.current!.value = ""
	}

	return (
		<div className="mt-8">
			<div className="md:text-lg mb-3">Please enter the keywords of your paper*</div>
			<ItemsContainer items={props.keywords} setItems={props.setKeywords} />
			<ItemsForm ref={ref} addItem={addKeyword} />
			{error
				? <div className="mt-1 text-sm text-red-500">{error}</div>
				: null
			}
		</div>
	)
}

export default Keywords