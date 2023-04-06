import Clock from "../component/Clock"
import { useState } from "react"
import { MobileTabDict } from "../type/tab"
import Tab from "@/component/Tab"

type Tabs = 'About' | 'Projects' | 'Why' | 'More'

const Mobile = () => {

    const [activeTab, setActiveTab] = useState<Tabs>('About')

    const Tabs: MobileTabDict = {
        'About': {
            imageSrc:'./src/assets/about.png',
            hoverImageSrc: './src/assets/about-hover.png'
        },
        'Projects' : {imageSrc: './src/assets/project.png', hoverImageSrc: './src/assets/project-hover.png'},
        'Why' : {imageSrc: './src/assets/anglerfish.png', hoverImageSrc: './src/assets/anglerfish-hover.png'},
    }
    return (
        <div
            className='w-screen h-screen flex flex-col'
        >
            <div
                className='flex flex-row justify-between w-screen h-10 bg-figma-blue dark:bg-figma-yellow fixed top-0'
            >
                <div
                    className='flex flex-row items-center justify-center space-x-4 pl-6'
                >
                    <img src='./src/assets/slide-thick.png' className='w-10 h-fit'/>
                    <Clock includeDate={false} />
                </div>
                <div className='pr-6 flex flex-row space-x-4 items-center'>
                <p>AthenaOS  </p>
                </div>
             
            </div>
            <div
                className='w-screen grow bg-figma-pink dark:bg-figma-pink'
            >
                View
            </div>
            <div
                className='flex flex-row justify-around w-screen h-28 bg-figma-light-blue dark:bg-figma-purple fixed bottom-0'
            >


                {Object.keys(Tabs).map((key : string) => {
                    const {imageSrc, hoverImageSrc}: any = Tabs[key];
                    return (
                    <div
                    className='flex flex-col items-center w-16 h-16 bg-white rounded-xl'
                    >
                        <img 
                            src={activeTab == key? hoverImageSrc : imageSrc}
                        />
                        <p> {key} </p>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Mobile