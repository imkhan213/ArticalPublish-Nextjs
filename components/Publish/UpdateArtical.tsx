import { useAppDispatch, useAppSelector, useAuth } from "@/hooks/redux-hooks"
import { createArticle, editArticle, IArticle, uploadFile } from "@/store/slices/article-slice"
import { logout } from "@/store/slices/auth-slice"
import { Divider } from "@mui/material"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import Authors from "./Authors"
import Dataset from "./Dataset"
import Keywords from "./Keywords"
import RaperPDF from "./PaperPDF"

interface IPublishOrEdit {
	article: IArticle | null
	userId?: string
}

export interface IDatasetState {
	type: "external_file_link" | "file_link" | null
	link: FormData | null | string
}

const UpdateArtical: FC<IPublishOrEdit> = (props) => {
	const [isDisabled, setIsDisabled] = useState(false)
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { token } = useAuth()

	const [errors, setErrors] = useState<string[]>([])
	const [paperFile, setpaperFile] = useState<any>(null)
	const [paperPDF, setPaperPDF] = useState<FormData | null>(null)
	const [apiScanId, setapiScanId] = useState<string>(Date.now().toString())
	const [authors, setAuthors] = useState<string[]>([])
	const [keywords, setKeywords] = useState<string[]>(props.article ? props.article.keywords : [])

	const [articleTextData, setArticleTextData] = useState({
		title: "",
		paperField: "",
		paperAbstract: props.article ? props.article.paperAbstract : "",
		dataAbstract: props.article ? props.article.dataAbstract : "",
		dataPrice: props.article ? props.article.dataPrice : "0",
		Scanid:apiScanId,

	})

	const [dataset, setDataset] = useState<IDatasetState>({
		type: null,
		link: null
	})

	const checkOnErrors = () => {
		const errors = []
		if (!paperPDF && !props.article) {
			errors.push("Please upload your paper in pdf format")
		} if (!articleTextData.title.trim() && !props.article) {
			errors.push("Be sure to include the title of the article")
		} if (authors.length === 0 && !props.article) {
			errors.push("Add at least one author of the article")
		} if (keywords.length === 0) {
			errors.push("Add at least one keyword")
		} if (!articleTextData.paperField.trim() && !props.article) {
			errors.push("Please indicate in which field/subfield is your article located?")
		} if (!articleTextData.paperAbstract.trim()) {
			errors.push("Please indicate an abstract for your article")
		}
		return errors
	}

	const publishHandler = async () => {
		const unauthorizatedHandler = () => {
			dispatch(logout({}))
			router.push("/auth/login_in")
		}

		setErrors([])
		let errors = checkOnErrors()
		if (errors.length > 0) {
			setErrors(errors)
			window.scrollTo(0, 0)
			return
		}

		setIsDisabled(true)
		if (!props.article && token) {
			
		} else if (props.article && token) {

            const pdfLink = await uploadFile(paperPDF!, token, unauthorizatedHandler)

			dispatch(editArticle({
				articleData: {
                    keywords,
					paperAbstract: articleTextData.paperAbstract.trim(),
					dataAbstract: articleTextData.dataAbstract.trim(),
					file: pdfLink!,
					Scanid:apiScanId,
				},
				articleId: router.query.id as string,
				router,
				token,
				unauthorizatedHandler
			}))
		}
	}

	return (
		<div className="w-[90%] mx-auto my-5 p-5 bg-purple-50/60 min-h-[90vh] rounded">
			<h1 className="text-3xl font-medium">Update Artical Doc</h1>
			<div className="flex flex-col gap-1 my-6">
				{errors.map((err, i) => {
					return <div key={i} className="font-medium text-red-500">• {err}</div>
				})}
			</div>
            <RaperPDF paperPDF={paperPDF} setPaperPDF={setPaperPDF} apiScanId={apiScanId} setpaperFile={setpaperFile} />

			<Divider sx={{ mt: "30px" }} />
			<button
				disabled={isDisabled}
				onClick={publishHandler}
				className="
					mt-8
					bg-main-blue
					hover:bg-main-blue/90
					disabled:bg-main-blue/90
					text-white
					text-sm
					px-4
					md:px-5
					duration-500
					font-medium
					h-8
					rounded-md
				"
			>
				Save the article
			</button>
		</div>
	)
}

export default UpdateArtical