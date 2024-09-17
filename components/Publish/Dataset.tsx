import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Typography } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import { IDatasetState } from "./PublishOrEdit"

interface IDataset {
	dataset: IDatasetState
	setDataset: (ds: IDatasetState | ((ds: IDatasetState) => IDatasetState)) => void
}

const Dataset: FC<IDataset> = (props) => {
	return (
		<div className="mt-8">
			<div className="mb-2 md:font-medium">
				Does your paper have a dataset?
				<div>If yes, please upload your dataset or share a link to the dataset (upload or paste the link)</div>
			</div>
			<DatasetTabs {...props} />
		</div>
	)
}

const DatasetTabs: FC<IDataset> = (props) => {
	const [activeTab, setActiveTab] = useState(0)
	const [fileName, setFileName] = useState("")

	const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		let file = e.currentTarget.files![0]

		if (file) {
			setFileName(file.name)
			const formData = new FormData()
			formData.append("file", file)
			props.setDataset({
				type: "file_link",
				link: formData
			})
		}
	}

	const clearDataset = () => {
		setFileName("")
		props.setDataset({
			type: null,
			link: null
		})
	}

	return (
		<div className="">
			<DatasetTabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === 0
				? <div className="flex my-6 gap-2 items-center">
					<input id="article_dataset_excel" type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={uploadFile} />
					<label
						htmlFor="article_dataset_excel"
						className="
							bg-main-blue hover:bg-main-blue/90 text-white
							text-sm
							px-3
							md:px-4
							duration-500
							font-medium
							h-[28px]
							md:h-[30px]
							rounded-md
							cursor-pointer
							flex justify-center items-center
						"
					>
						{fileName
							? <Typography noWrap className="max-w-[100px] !font-['system-ui'] !font-medium">{fileName}</Typography>
							: "Upload dataset"
						}
					</label>
					{props.dataset.type === "file_link" &&
						<FontAwesomeIcon
							icon={faXmark}
							onClick={clearDataset}
							className="text-xm text-red-500 mt-[2px] cursor-pointer"
						/>
					}
				</div>
				: <div className="">
					<div className="text-sm md:text-base font-medium text-red-500 my-2">Make sure you make your file available to everyone via the link </div>
					<input 
						type="text" 
						placeholder="Your link..." 
						className="w-[260px] h-[26px] border-2 border-main-blue rounded px-1"
						value={props.dataset.type === "file_link" ? undefined : (props.dataset.link as string)}
						onChange={e => {
							if (!e.currentTarget.value) {
								clearDataset()
							} else {
								props.setDataset({
									type: "external_file_link",
									link: e.currentTarget.value
								})
							}
						}}
					/>
				</div>
			}
		</div>
	)
}

const DatasetTabsNav: FC<{ activeTab: number, setActiveTab: (n: number) => void }> = (props) => {
	return (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2 cursor-pointer" onClick={() => props.setActiveTab(0)}>
				<div className="w-4 h-4 bg-main-blue flex justify-center items-center rounded-full">
					{props.activeTab === 0 &&
						<span className="w-[6px] h-[6px] bg-white rounded-full"></span>
					}
				</div>
				<span>File</span>
			</div>

			<div className="flex items-center gap-2 cursor-pointer" onClick={() => props.setActiveTab(1)}>
				<div className="w-4 h-4 bg-main-blue flex justify-center items-center rounded-full">
					{props.activeTab === 1 &&
						<span className="w-[6px] h-[6px] bg-white rounded-full"></span>
					}
				</div>
				<span>Link</span>
			</div>
		</div>
	)
}

export default Dataset