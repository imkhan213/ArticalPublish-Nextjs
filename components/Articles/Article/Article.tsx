import { IArticle, getPlagiarismScore, checkarticalOrder } from "@/store/slices/article-slice"
import { IUser } from "@/store/slices/auth-slice"
import { Divider } from "@mui/material"
import Link from "next/link"
import { FC, useState, useEffect } from "react"
import { baseURL } from "../../Layout"
import ReviewersRating from "./ReviewersRating"
import Reviews from "./Reviews"
import { useAuth } from '@/hooks/redux-hooks'

import GlobalPreloader from "@/components/GlobalPreloader"

interface IArticleComponent {
	article: IArticle
}

const Article: FC<IArticleComponent> = (props) => {
	const buttonStyles = `
		underline
		text-blue-500
		hover:text-blue-400
		duration-500
		text-medium
		text-lg
	`
	const { id } = useAuth()

	interface ScanRecord {
		// Define the properties of the scan record.
		// Replace 'data_type' with the actual data type of each property.
		aggregatedScore: any;
		identicalWords: any;
		minorChangedWords: any;
		relatedMeaningWords: any;
	  }
	
	const [scanRecord, setscanRecord] = useState<ScanRecord | null>(null);
	const [scanexist, setscanexist] = useState(true);
	const [isordered, setisordered] = useState(false);

	useEffect(() => {
		if(props.article.Scanid){
			getPlagiarismScore(props.article.Scanid).then(resp => {
				
				if(resp.length > 0){
					if(resp['0'].results.results.score){
						setscanRecord(resp['0'].results.results.score);
					}
				}else{
					setscanexist(false);
				}
			})
		}

		if(id){
			checkarticalOrder(props.article._id,id).then(resp => {
				if(resp > 0){
					setisordered(true);
				}else{
					setisordered(false);
				}
			});
		}

	}, [])
	if(props.article.Scanid){
		if (!scanRecord && scanexist) return <GlobalPreloader />
	}

	//let dprice = props.article.dataPrice;
	let dprice = parseFloat(props.article.dataPrice); 
	//dprice = parseInt(dprice, 10);
	return (
		
		<div className="w-[94%] md:w-[80%] mx-auto my-5 p-5 bg-purple-50/60 min-h-[90vh] rounded-md">
			<h1 className="text-2xl font-medium text-center">{props.article.title}</h1>
			<div className="flex gap-3 justify-center mt-1">
				{(isordered || dprice < 1) ?
				<Link href={`/review/${props.article._id}`} className={buttonStyles}>Review paper</Link>
				: 
				<Link href={`/checkout/${props.article._id}`} className={buttonStyles}>Review paper</Link>
				}
				{id === props.article.owner && id
					? <a href={props.article.file} target='_blank' rel='noreferrer' className={buttonStyles} download>Download paper</a>
					: null
				}

				{/*<a href={props.article.file} target='_blank' rel='noreferrer' className={buttonStyles} download>Download paper</a>*/}

			</div>
			<Divider sx={{ my: '10px' }} />

			<div className="flex flex-col flex-wrap gap-5 mt-5 | min-[900px]:flex-row">
				<div className="w-full min-[1000px]:w-[48%] bg-main-blue/10 rounded-md p-4 flex flex-col">
					
					<Authors authors={props.article.authors} unregisteredAuthors={props.article.unregisteredAuthors} />
					<Keywords keywords={props.article.keywords} />
					<div className="flex items-center gap-1 mt-4">
						<div className="font-medium">Number of Reviews:</div>
						<div>{props.article.reviewers.length}</div>
					</div>
					{props.article.reviewers.length > 0 && <Reviewers reviewers={props.article.reviewers} />}
					<div className="flex items-center gap-1 mt-3">
						<div className="font-medium">Plagiarism Hold:</div>
						<div>{`${props.article.plagiarismHold}`}</div>
					</div>
					<div className="flex items-center gap-1 mt-3">
						<div className="font-medium">Field / subfield:</div>
						<div>{`${props.article.paperField}`}</div>
					</div>
					<div className="flex items-center gap-1 mt-3">
						<div className="font-medium">Time of Publication:</div>
						<div className="font-['Lato'] text-sm">{new Date(props.article.createDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
					</div>

					<Abstracts paperAbstract={props.article.paperAbstract} dataAbstract={props.article.dataAbstract} dataPrice={props.article.dataPrice} />
					<Dataset article={props.article} />

				</div>
				{(dprice < 1) ? '' : 
				<div className="w-full min-[1000px]:w-[48%] bg-main-blue/10 rounded-md p-4 flex flex-col">
					
					{(props.article.Scanid && scanRecord !== null && scanexist) ? 
						<div>
							<div className="mt-4 text-xl">Plagiarism Score</div>
							<div className="mt-5">
								<h5>Aggregated Score : <b>{scanRecord.aggregatedScore}</b></h5>
								<h5>Identical Words : <b>{scanRecord.identicalWords}</b></h5>
								<h5>Minor Changed Words : <b>{scanRecord.minorChangedWords}</b></h5>
								<h5>Related Meaning Words : <b>{scanRecord.relatedMeaningWords}</b></h5>
								
							</div>
						</div>
						: (!scanexist) ? 
						<div>
							<div className="mb-3 text-center text-xl">Plagiarism Score</div>
							<div className="mt-8 text-[silver]">
								<span>Status - Pending.</span>
							</div>
						</div>
						:
						<div>
							<div className="mb-3 text-center text-xl">Plagiarism Score</div>
							<div className="mt-8 text-[silver]">
								<span>Score not found</span>
							</div>
						</div>
					}
				</div>
				}
			</div>
			
			<Divider sx={{ my: '10px' }} />

			<Reviews reviews={props.article.reviews} />
			{props.article.reviews.length > 0 &&
				<>
					<Divider sx={{ mt: '30px' }} />
					<ReviewersRating reviews={props.article.reviews} isDataset={!!props.article.dataset.type} />
				</>
			}
		</div>
	)
}

const Authors: FC<{ authors: IUser[], unregisteredAuthors: string[] }> = (props) => {
	return (
		<div className="mt-4 flex gap-1 flex-wrap text-lg w-[70%]">
			<div className="font-medium">Authors:</div>
			<div className="flex items-center gap-1 flex-wrap">
				{props.authors.map((author, i) => {
					return <Link href={`/profile/${author._id}`} key={i} className="text-main-blue underline">
						{`${author.firstName} ${author.lastName}${i !== props.authors.length - 1 ||
							props.unregisteredAuthors.length > 0
								? ','
								: ''
							}
						`}
					</Link>
				})}
				{props.unregisteredAuthors.map((author, i) => {
					return <div key={i} className="text-main-blue">{author}{i !== props.unregisteredAuthors.length - 1 && ','}</div>
				})}
			</div>
		</div>
	)
}

const Keywords: FC<{ keywords: string[] }> = (props) => {
	return (
		<div className="mt-2 flex flex-wrap gap-1 text-lg w-[70%]">
			<div className="font-medium">Keywords:</div>
			<div className="flex items-center gap-1 flex-wrap">
				{props.keywords.map((word, i) => {
					return <div key={i} className="px-[6px] py-[2px] bg-white rounded text-sm font-semibold">{word}</div>
				})}
			</div>
		</div>
	)
}

const Reviewers: FC<{ reviewers: IUser[] }> = (props) => {
	return (
		<div className="mt-2 flex flex-wrap gap-1 w-[70%]">
			<div className="font-medium">Reviewers:</div>
			<div className="flex items-center gap-1 flex-wrap">
				{props.reviewers.map((reviewer, i) => {
					return <Link href={`/profile/${reviewer._id}`} key={i} className="text-main-blue underline">
						{`${reviewer.firstName} ${reviewer.lastName}${props.reviewers.length > 0 && i !== props.reviewers.length - 1 ? ',' : ''}`}
					</Link>
				})}
			</div>
		</div>
	)
}

const Abstracts: FC<{ paperAbstract: string, dataAbstract: string, dataPrice: string }> = (props) => {
	
	const numericDataPrice = parseFloat(props.dataPrice); 

	return (
		<div className="mt-4 flex flex-col gap-3">
			<div className="flex flex-col items-start justify-start">
				<div className="font-medium">Paper Abstract:</div>
				<div className="bg-white rounded-md p-2 text-wrap max-w-[400px]">
					{props.paperAbstract}
				</div>
			</div>
			<div className="flex flex-col items-start justify-start">
				{props.dataAbstract
					? <>
						<div className="font-medium">Data Abstract:</div>
						<div className="bg-white rounded-md p-2 text-wrap max-w-[400px]">
							{props.dataAbstract}
						</div>
					</>
					: <div className="text-lg"><span className="font-medium">Data Abstract:</span> not specified</div>
				}
			</div>
			<div className="flex flex-col items-start justify-start">
				{props.dataPrice
					? (numericDataPrice > 0) ? 
					<div className="flex items-center gap-1">
						<div className="font-medium">Price:</div>
						<div>{props.dataPrice} USD</div> 
					</div>
					: 
					<div className="flex items-center gap-1">
						<div className="font-medium">Price:</div>
						<div>Free</div> 
					</div>
					: 
					<div className="flex items-center gap-1">
						<div className="font-medium">Price:</div>
						<div>not specified</div>
					</div>
				}
			</div>
		</div>
	)
}

const Dataset: FC<{ article: IArticle }> = (props) => {
	const typeLink = props.article.dataset.type

	const isFile = typeLink === 'file_link'

	return (
		<div className="flex gap-1">
			<div className="font-medium">
				Dataset{isFile ? '(file)' : typeLink ? '(external link)' : ''}:
			</div>
			<a 
				href={props.article.dataset.link!} 
				target={isFile ? undefined :'_blank'} 
				download={isFile} 
				className='underline text-blue-500 hover:text-blue-400 duration-500' 
				rel={isFile ? undefined : 'noreferrer'}
			>
				{isFile ? 'Download' : 'Go to link'}
			</a>
		</div>
	)
}

export default Article