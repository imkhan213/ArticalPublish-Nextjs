import { useAuth } from '@/hooks/redux-hooks'
import { IArticle, getScans } from "@/store/slices/article-slice"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Typography } from "@mui/material"
import Link from "next/link"
import { FC, useState, useEffect, CSSProperties } from "react"
import GlobalPreloader from "@/components/GlobalPreloader"
import { ownerDetails } from "@/store/slices/auth-slice"

interface ITabsArticles {
	profile: "my" | "not_my"
	pubs: IArticle[]
	userId: string
}


const TabsArticles: FC<ITabsArticles> = (props) => {

	return (
		<div className="">
			
		</div>
	)
}
 
export const ArticlesItem: FC<{ scandata?: any, reviewpage?: any }> = (props) => {
	const { id } = useAuth()
	
	
	const myStyle: CSSProperties = {
		float: 'right',
		borderRadius:'4px',
		padding:'0 5px',
		border: '1px solid #414284',
		background: '#414284',
		color: '#fff',
	  };
	const myStyle2: CSSProperties = {
		float: 'right',
		borderRadius:'4px',
		padding:'0 5px',
		border: '1px solid #5a3232',
		background: '#5a3232',
		color: '#fff',
	  };
	  const myStyle3: CSSProperties = {
		float: 'right',
		borderRadius:'4px',
		padding:'0 5px',
		border: '1px solid #4E4E4E',
		background: '#4E4E4E',
		color: '#fff',
	  };

	return (
		<div className="w-full min-[1000px]:w-[48%] bg-main-blue/10 rounded-md p-4 flex flex-col">
			<Typography noWrap>
				
				<Link href="#" className="font-medium text underline">Demo A</Link>
				 
				<span style={myStyle3}>
					<span>Plagiarism : Pending</span>
				</span>
				 
				
			</Typography>
			<div className="mt-2 flex flex-wrap gap-1">
				<div className="">Keywords:</div>
				<div className="flex items-center gap-1 flex-wrap">
					<div className="px-[6px] py-[2px] bg-white/80 rounded text-sm">test</div>
					
				</div>
			</div>
			<div className="mt-2 flex gap-1 flex-wrap">
				<div className="">Authors:</div>
				<div className="flex items-center gap-1 flex-wrap">
					<Link href="#" className="text-main-blue underline">
							John
					</Link> 
				</div>
			</div>
			<div className="mt-auto">
				<div className="mt-2">Time of Publication: 1 Jan 2010</div>
			</div>
			
			<div className="mt-auto">
				<div className="mt-2">Price: Free</div>
				<div className="mt-2">
				<a href="#" style={myStyle2}>Download</a>
				</div>
			</div>
			
		</div>
	)
}

export default TabsArticles