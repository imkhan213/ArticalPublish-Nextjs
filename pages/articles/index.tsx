import Articles from "@/components/Articles/Articles"
import CustomHead from "@/components/CustomHead"
import Header from "@/components/Header"

const ArticlesDefault = () => {
	return (
		<div className="min-h-screen relative">
			<CustomHead title="Articles" metaDesc='Articles' />
			<Header />
			<Articles />
		</div>
	)
}

export default ArticlesDefault