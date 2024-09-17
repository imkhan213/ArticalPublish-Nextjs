import { useAuth } from '@/hooks/redux-hooks'
import { IArticle, getOrders } from "@/store/slices/article-slice"
import GlobalPreloader from "@/components/GlobalPreloader"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Typography } from "@mui/material"
import Link from "next/link"
import { FC, useState, useEffect, CSSProperties } from "react"

interface IArtItems {
	items: IArticle[];
}

interface ITabsArticles {
	profile: "my" | "not_my"
	pubs: IArticle[]
	userId: string
	artItems:IArtItems
}

const TabsOrders: FC<ITabsArticles> = (props) => {
	const [orderItems, setorderItems] = useState(null);

	useEffect(() => {
		getOrders(props.userId).then(resp => {
			setorderItems(resp);
		})
	}, [])
	if (!orderItems) return <GlobalPreloader />
	console.log(props.artItems);
	return (
		<div className="">
			<div className="flex flex-col gap-5 mt-6 flex-wrap | min-[900px]:flex-row">
				{props.artItems.items.map(item => <ArticlesItem key={item._id} item={item}  orderItems={orderItems}/>)}
			</div>
		</div>
	)
}

export const ArticlesItem: FC<{ item: IArticle; orderItems: any[] }> = (props) => {
	const { id } = useAuth()

	// if (props.orderItems.includes(props.item._id)) {
		
	// }else{
	// 	return null;
	// }

	const valueExists = props.orderItems.some(item => item.pubsid === props.item._id);
	  
	  if (valueExists) {

	  }else{
		return null;
	  }
	

	const myStyle: CSSProperties = {
		float: 'right',
		borderRadius:'4px',
		padding:'0 5px',
		border: '1px solid #5a3232',
		background: '#5a3232',
		color: '#fff',
	  };
	  
	return (
		<div className="w-full min-[1000px]:w-[48%] bg-main-blue/10 rounded-md p-4 flex flex-col">
			<Typography noWrap>
				<Link href={`/articles/${props.item._id}`} className="font-medium text underline">{props.item.title}</Link>
			</Typography>
			<div className="mt-2 flex flex-wrap gap-1">
				<div className="">Keywords:</div>
				<div className="flex items-center gap-1 flex-wrap">
					{props.item.keywords.map((word, i) => {
						return <div key={i} className="px-[6px] py-[2px] bg-white/80 rounded text-sm">{word}</div>
					})}
				</div>
			</div>
			<div className="mt-2 flex gap-1 flex-wrap">
				<div className="">Authors:</div>
				<div className="flex items-center gap-1 flex-wrap">
					{props.item.authors.map((author, i) => {
						return <Link href={`/profile/${author._id}`} key={i} className="text-main-blue underline">
							{`${author.firstName} ${author.lastName}${
								i !== props.item.authors.length - 1 ||
								props.item.unregisteredAuthors.length > 0 
									? ',' 
									: ''
								}
							`}
						</Link>
					})}
					{props.item.unregisteredAuthors.map((author, i) => {
						return <div key={i} className="text-main-blue">{author}{i !== props.item.unregisteredAuthors.length - 1 && ','}</div>
					})}
				</div>
			</div>
			<div className="mt-auto">
				<div className="mt-2">Time of Publication: {new Date(props.item.createDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
			</div>
			<div className="mt-auto">
				<div className="mt-2">
					<a href={props.item.file} target='_blank' rel='noreferrer' style={myStyle} download>Download paper</a>	
				</div>
			</div>
			
		</div>
	)
}

export default TabsOrders