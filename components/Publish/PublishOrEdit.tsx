import { useAppDispatch, useAppSelector, useAuth } from "@/hooks/redux-hooks"
import { createArticle, editArticle, IArticle, uploadFile } from "@/store/slices/article-slice"
import { logout } from "@/store/slices/auth-slice"
import { Divider } from "@mui/material"
import { useRouter } from "next/router"
import { FC, useState, useEffect } from "react"
import Authors from "./Authors"
import Dataset from "./Dataset"
import Keywords from "./Keywords"
import RaperPDF from "./PaperPDF"
import axios from "axios"

interface IPublishOrEdit {
	article: IArticle | null
	userId?: string
	userData?:any
}

export interface IDatasetState {
	type: "external_file_link" | "file_link" | null
	link: FormData | null | string
}

const PublishOrEdit: FC<IPublishOrEdit> = (props) => {
	const [publicKey, setpublicKey] = useState(null);
	const [secretKey, setsecretKey] = useState(null);

	useEffect(() => {
		if(props.userData?.publicKey && props.userData?.secretKey) {
		  setpublicKey(props.userData.publicKey);
		  setsecretKey(props.userData.secretKey);
		}
	}, [props.userData?.publicKey, props.userData?.secretKey]);
	
	const [isDisabled, setIsDisabled] = useState(false)
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { token } = useAuth()

	const [errors, setErrors] = useState<string[]>([])

	const [paperPDF, setPaperPDF] = useState<FormData | null>(null)
	const [paperFile, setpaperFile] = useState<any>(null)
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

		let ddprice = articleTextData.dataPrice.trim();	
		//ddprice = parseFloat(ddprice);
		let artiprice = parseFloat(ddprice);
		if(!props.article && artiprice > 0){
			if(!publicKey || !secretKey || publicKey == "NA" || secretKey == "NA" ){
				errors.push("Please add the stripe details first")
			}
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
			const pdfLink = await uploadFile(paperPDF!, token, unauthorizatedHandler)

			let datasetLink = null
			if (dataset.type === "file_link") {
				datasetLink = await uploadFile(dataset.link as FormData, token, unauthorizatedHandler, true)
			}

			/* plagiarism api for scan file */

			//const plagiarismSubmit = async (paperPDF) => {
			let dprice = articleTextData.dataPrice.trim();	
			let artprice = parseFloat(dprice); 
			//dprice = parseInt(dprice, 10);

			if(artprice > 0){
				const formData = new FormData();
				formData.append('file', paperFile);
				formData.append("scanId", apiScanId)
				const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
				try {
				const response = await axios.post(baseURL+'/proxy/submitFile', formData);
				console.log(response);
				//setapiRes('Scan request successfully sent. after completion it will show score on view page.');
				} catch (error) {
					console.log(error);
					//setapiRes('Error submitting file:', error.message);
				}
				//return;
			}
			//};
			//setTimeout(function () { plagiarismSubmit(paperPDF) })
			/* end api */

			dispatch(createArticle({
				articleData: {
					owner: props.userId!,
					file: pdfLink!,
					title: articleTextData.title.trim(),
					authors,
					keywords,
					createDate: new Date().toISOString(),
					paperField: articleTextData.paperField.trim(),
					paperAbstract: articleTextData.paperAbstract.trim(),
					dataAbstract: articleTextData.dataAbstract.trim(),
					dataPrice: articleTextData.dataPrice.trim(),
					Scanid:apiScanId,
					dataset: {
						type: dataset.type,
						link: dataset.type === "external_file_link" ? (dataset.link as string).trim() : datasetLink!
					}
				},
				token,
				router,
				unauthorizatedHandler,
			}))
		} else if (props.article && token) {
			dispatch(editArticle({
				articleData: {
					keywords,
					paperAbstract: articleTextData.paperAbstract.trim(),
					dataAbstract: articleTextData.dataAbstract.trim(),
					dataPrice: articleTextData.dataPrice.trim(),
					//Scanid:apiScanId,
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

			{(!props.article) ?
				(!publicKey || !secretKey || publicKey == "NA" || secretKey == "NA" ) ? 
				<p className="text-center text-red-500">Note : before publish an article you need to add the stripe details first.</p>
				 : ''
				: ''
			}
			<h1 className="text-3xl font-medium">{props.article ? "Editing an article" : "Creating an article"}</h1>

			<div className="flex flex-col gap-1 my-6">
				{errors.map((err, i) => {
					return <div key={i} className="font-medium text-red-500">• {err}</div>
				})}
			</div>

			{!props.article &&
				<>
					<RaperPDF paperPDF={paperPDF} setPaperPDF={setPaperPDF} apiScanId={apiScanId} setpaperFile={setpaperFile} />
					<FieldContainer
						title="Article title*"
						value={articleTextData.title}
						setValue={(v: string) => setArticleTextData({ ...articleTextData, title: v })}
					/>
					<Divider sx={{ mt: "30px" }} />
				</>
			}
			{!props.article && <Authors authors={authors} setAuthors={setAuthors} />}
			<Keywords keywords={keywords} setKeywords={setKeywords} />
			<Divider sx={{ mt: "40px" }} />
			{!props.article &&
				<FieldContainer
					title="What field/subfield is your paper in?*"
					value={articleTextData.paperField}
					setValue={(v: string) => setArticleTextData({ ...articleTextData, paperField: v })}
				/>
			}
			<FieldContainer
				title="Please write an abstract of your paper here*"
				value={articleTextData.paperAbstract}
				setValue={(v: string) => setArticleTextData({ ...articleTextData, paperAbstract: v })}
			/>
			{!props.article && <Dataset dataset={dataset} setDataset={setDataset} />}
			<FieldContainer
				title="Please briefly describe your dataset(s)"
				value={articleTextData.dataAbstract}
				setValue={(v: string) => setArticleTextData({ ...articleTextData, dataAbstract: v })}
			/>
			<FieldContainer
				title="Selling Price"
				value={articleTextData.dataPrice}
				setValue={(v: string) => setArticleTextData({ ...articleTextData, dataPrice: v })}
			/>
			
			{/* 
			<FieldContainer
				title="Scan ID"
				value={articleTextData.Scanid}
				setValue={(v: string) => setArticleTextData({ ...articleTextData, Scanid: v })}
			/>
			*/}

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
				{!props.article ? "Publish an article" : "Save the article"}
			</button>
		</div>
	)
}

const FieldContainer: FC<{ title: string, value: string, setValue: (v: string) => void }> = (props) => {
	return (
		<div className="mt-6">
			<div className="mb-2 md:font-medium">{props.title}</div>
			<div className="max-w-[300px]">
				<input
					value={props.value}
					onChange={e => props.setValue(e.currentTarget.value)}
					type="text"
					className="w-full h-[28px] border-2 border-main-blue rounded px-1"
				/>
			</div>
		</div>
	)
}

export default PublishOrEdit