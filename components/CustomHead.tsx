import Head from "next/head";
import { FC } from "react";

const CustomHead: FC<{ title: string, metaDesc: string }> = (props) => {
	return (
		<>
			<Head>
				<title>
					{props.title}
				</title>
				<meta
					name="description"
					content={props.metaDesc}
					key="desc"
				/>
			</Head>
		</>
	)
}

export default CustomHead