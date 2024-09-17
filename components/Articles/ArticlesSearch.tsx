import { useOnClickOutside } from "@/hooks/use-click-outside"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef } from "react"
import { FC, useState } from "react"
import { TSearchType } from "./Articles"
import ArticlesSearchDate from "./ArticlesSearchDate"

interface IArticlesSearch {
	searchText: string
	setSearchText: (t: string | ((t: string) => string)) => void

	searchType: TSearchType
	setSearchType: (t: TSearchType | ((t: TSearchType) => TSearchType)) => void

	searchDate: string
	setSearchDate: (t: string | ((t: string) => string)) => void
}

const ArticlesSearch: FC<IArticlesSearch> = (props) => {
	const [inputText, setInputText] = useState(props.searchText)
	const [inputDate, setInputDate] = useState(new Date().toISOString())

	useEffect(() => {
		setInputText("")
	}, [props.searchType])

	const placeholder = () => {
		switch (props.searchType) {
			case "Title":
				return "Title..."

			case "Authors":
				return "Author 1,Author 2,..."

			case "Keywords":
				return "Keyword 1,Keyword 2,..."

			case "Date":
				return "Date..."
		}
	}

	const searchButtonHandler = () => {
		if (props.searchType !== 'Date') {
			props.setSearchText(inputText)
		} else {
			props.setSearchDate(inputDate)
		}
	}

	return (
		<div className="flex flex-col gap-1 justify-center w-[200px] mx-auto | min-[550px]:w-full min-[550px]:flex-row">
			{props.searchType === "Date"
				? <ArticlesSearchDate value={inputDate} setValue={setInputDate} submitHandler={searchButtonHandler} />
				: <input
					placeholder={placeholder()}
					className="
						placeholder:text-[#666]
						border-2
						border-main-blue
						rounded
						h-[30px]
						w-[200px]
						px-2
						|
						min-[550px]:w-[300px]
					"
					value={inputText}
					onChange={e => setInputText(e.currentTarget.value)}
					onKeyDown={(e) => { e.key === "Enter" && searchButtonHandler() }}
				/>
			}
			<div className="flex gap-1">
				<Select searchType={props.searchType} setSearchType={props.setSearchType} />
				<button
					onClick={searchButtonHandler}
					className="
						h-[28px] 
						text-sm 
						rounded 
						bg-main-blue hover:bg-main-blue/95 text-white 
						duration-500 
						w-1/2
						| 
						min-[550px]:h-[30px] 
						min-[550px]:text-base
						min-[550px]:px-3
						min-[550px]:w-auto
					"
				>
					Search
				</button>
			</div>
		</div>
	)
}

interface ISelect {
	searchType: TSearchType
	setSearchType: (t: TSearchType | ((t: TSearchType) => TSearchType)) => void
}

const Select: FC<ISelect> = (props) => {
	const ref = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	useOnClickOutside(ref, () => setIsOpen(false))

	return (
		<div className="relative w-[100px]" ref={ref}>
			<div
				className="
					bg-main-blue hover:bg-main-blue/95 text-white
					duration-500
					py-[2px]
					px-2
					text-sm
					h-[28px]
					rounded
					cursor-pointer
					flex 
					gap-2
					justify-center
					items-center
					|
					min-[550px]:h-[30px]
					min-[550px]:text-base
				"
				onClick={() => setIsOpen(!isOpen)}
			>
				{props.searchType}
				<FontAwesomeIcon icon={faCaretDown} className="!text-[13px] mt-[2px]" />
			</div>
			{isOpen &&
				<div className="flex flex-col text-[silver] w-full absolute left-0 top-[32px] bg-main-blue rounded">
					{["Title", "Authors", "Keywords", "Date"].map((i, index) => {
						return (
							<div
								onClick={() => {
									props.setSearchType(i as TSearchType)
									setIsOpen(false)
								}}
								key={index}
								className={`
									py-[2px] 
									px-2 
									duration-500 
									cursor-pointer
									text-sm
									|
									min-[550px]:text-base
									${i === props.searchType ? 'bg-white/10 text-white' : 'hover:bg-white/10 hover:text-white'}
								`}
							>
								{i}
							</div>
						)
					})}
				</div>
			}
		</div>
	)
}

export default ArticlesSearch
