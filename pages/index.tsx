import TopImage from "@/components/Home/TopImage"
import DataSharing from "@/components/Home/DataSharing"
import WhatIsSP from "@/components/Home/WhatIsSP"
import WhyUseSP from "@/components/Home/WhyUseSP"
import CopyrightProtection from "@/components/Home/CopyrightProtection"
import QAs from "@/components/Home/Q&As"
import CustomHead from "@/components/CustomHead"
import Header from "@/components/Header"

const Home = () => {
    return (
        <div className="">
            <Header />
            <div className="w-[80%] mx-auto my-8">
                <CustomHead title="SP" metaDesc="What is SP?" />
                <TopImage />
                <WhatIsSP />
                <WhyUseSP />
                <DataSharing />
                <CopyrightProtection />
                <QAs />
            </div>
        </div>
    )
}

export default Home