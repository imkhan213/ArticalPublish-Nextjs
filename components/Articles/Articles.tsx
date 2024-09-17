import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks"
import { getArticles, setArticles, getScans } from "@/store/slices/article-slice"
import React, { useEffect } from "react"
import { useState } from "react"
import { ArticlesItem } from "../Profile/TabsArticles"
import ArticlesSearch from "./ArticlesSearch"
import Image from "next/image"

import preloader from "./../../images/base-preloader.svg"
import itemsLoader from "./../../images/items-loader.svg"

import GlobalPreloader from "@/components/GlobalPreloader"
//import ReactModal from 'react-modal';

export type TSearchType = "Title" | "Authors" | "Keywords" | "Date"

const Articles = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => {
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};
	
	const [searchText, setSearchText] = useState("")
	const [searchDate, setSearchDate] = useState("")
	const [searchType, setSearchType] = useState<TSearchType>("Title")

	const { status, articles } = useAppSelector(state => state.article)
	const dispatch = useAppDispatch()
	const [offset, setOffset] = useState(1)
	const limit = 20
  
	const [scanItems, setscanItems] = useState<any>({ scanitems: [] });
  
	const arraydata = [...Array(1,2,3)];
	interface ScanItem {
		id: any;
		score: any;
		status: any;
	}
 
	return (
		<div className="py-10">
			<ArticlesSearch
				searchText={searchText}
				setSearchText={setSearchText}

				searchType={searchType}
				setSearchType={setSearchType}

				searchDate={searchDate}
				setSearchDate={setSearchDate}
			/>
			<div className="w-[90%] mx-auto mt-8">
				<div className="text-2xl">Articles</div>
				<div className="flex flex-col flex-wrap gap-5 mt-5 | min-[900px]:flex-row">
					{arraydata.map(_=><ArticlesItem />)}
				</div>
				
			</div>
			  
		</div>
	)
}

export default Articles