import { useAuth } from '@/hooks/redux-hooks'
import GlobalPreloader from "@/components/GlobalPreloader"
import { FC, useState, useEffect, CSSProperties } from "react"

interface ITabsSubscription {
	profile: "my" | "not_my"
	userId: string
	subscriptions: any
}

const TabsSubscriptions: FC<any> = (props) => {
	
	return (
		<div className="">
			<div className="flex flex-col gap-5 mt-6 flex-wrap | min-[900px]:flex-row">
				{props.subscriptions.map((item:any) => <SubscriptionItem key={item._id} item={item}/>)}
			</div>
		</div>
	)
}

export const SubscriptionItem: FC<{ item: any; }> = (props) => {
	const { id } = useAuth()

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
			<div className="mt-2 flex flex-wrap gap-1">
				<div className="text-2xl">Text Analysis</div>
			</div>
			<div className="mt-auto">
				<div className="mt-2"><span className="text-4xl ">${props.item.price}</span>/month</div>
			</div>
			<div className="mt-auto">
				<div className="mt-5">Status: {props.item.status}</div>
			</div>
			<div className="mt-auto">
				<div className="mt-5">Subscription ID: <a href={`/subscribe/${props.item.subscriptionid}`} className="underline">{props.item.subscriptionid}</a></div>
			</div>
			<div className="mt-auto">
				<div className="mt-2">Created At: {new Date(props.item.createDate).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</div>
			</div>
			
			<div className="mt-auto">
				<div className="mt-2">
					<a href={`/subscribe/${props.item.subscriptionid}`} style={myStyle}>View</a>
				</div>
			</div>
			
		</div>
	)
}

export default TabsSubscriptions