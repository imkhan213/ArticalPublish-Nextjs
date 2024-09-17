import React, { FC } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { IUser } from "@/store/slices/auth-slice"
import TabsInfo from "./TabsInfo"
import TabsArticles from "./TabsArticles"
import TabsReviews from "./TabsReviews"
import TabsOrders from "./TabsOrders"
import TabsSubscriptions from "./TabsSubscriptions"

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 1 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

const a11yProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

const ProfileTabs: FC<{ profile: "my" | "not_my", userData: IUser, getUserData: () => void, artItems:any, subscriptions?:any }> = (props) => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const artItems = { items: props.artItems };

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			{props.profile === "my" ? 
				<Tabs 
					value={value} 
					onChange={handleChange} 
					aria-label="basic tabs example"
					variant="scrollable"
					allowScrollButtonsMobile
					TabIndicatorProps={{ sx: { backgroundColor: "#32335A" } }}
					sx={{
						"& button": { color: "#32335A !important", fontFamily: "Lato", fontSize: { xs: "14px", sm: "17px" }, textTransform: "none"},
						// "& button.Mui-selected": { color: "#C182F9 !important" },
					}}
				>
					<Tab label={props.profile === "my" ? "My information" : "Author information"} {...a11yProps(0)} />
					<Tab label={props.profile === "my" ? "My pubs" : "Pubs"} {...a11yProps(1)} />
					<Tab label={props.profile === "my" ? "My reviews" : "Reviews"} {...a11yProps(2)} />
					<Tab label={props.profile === "my" ? "My Orders" : "Orders"} {...a11yProps(3)} />
					<Tab label={props.profile === "my" ? "My Subscriptions" : "Subscriptions"} {...a11yProps(4)} />
				</Tabs>

			: 
				<Tabs 
					value={value} 
					onChange={handleChange} 
					aria-label="basic tabs example"
					variant="scrollable"
					allowScrollButtonsMobile
					TabIndicatorProps={{ sx: { backgroundColor: "#32335A" } }}
					sx={{
						"& button": { color: "#32335A !important", fontFamily: "Lato", fontSize: { xs: "14px", sm: "17px" }, textTransform: "none"},
						// "& button.Mui-selected": { color: "#C182F9 !important" },
					}}
				>
					<Tab label="Author information" {...a11yProps(0)} />
					<Tab label="Pubs" {...a11yProps(1)} />
				</Tabs>
			}
			</Box>
			<TabPanel value={value} index={0}>
				<TabsInfo userData={props.userData} getUserData={props.getUserData} profile={props.profile} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<TabsArticles pubs={[...props.userData.myPubs].reverse()} profile={props.profile} userId={props.userData._id} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<TabsReviews reviews={[...props.userData.myReviews].reverse().map(i => i.article)} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<TabsOrders pubs={[...props.userData.myPubs].reverse()} profile={props.profile} userId={props.userData._id} artItems={props.artItems} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<TabsSubscriptions profile={props.profile} userId={props.userData._id} subscriptions={props.subscriptions} />
			</TabPanel>
		</Box>
	)
}

export default ProfileTabs