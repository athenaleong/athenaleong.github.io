import Clock from "../component/Clock"
import { useCallback, useState } from "react"
import { MobileTabDict } from "../type/tab"
import AboutTab from "./AboutTab"
import ProjectTab from "./ProjectTab"
import WhatTab from "./WhatTab"
import { render } from "react-dom"
import { id } from "date-fns/locale"
import SettingTab from "./SettingTab"

type MobileTabs = 'About' | 'Projects' | '???' | 'Setting'


const Mobile = () => {

    const [activeTab, setActiveTab] = useState<string>('About')

    const renderView = useCallback(() => {
        switch (activeTab) {
            case 'About':
                return (<AboutTab isMobile={true}/>)
            case 'Projects':
                return (<ProjectTab isMobile={true}/>)
            case '???':
                return (<WhatTab isMobile={true}/>)
            case 'Setting':
                return (<SettingTab />)
            
        }

    }, [activeTab])
    const Tabs: MobileTabDict = {
        'About': {
            imageSrc:'./src/assets/about.png',
            hoverImageSrc: './src/assets/about-hover.png'
        },
        'Projects' : {imageSrc: './src/assets/project.png', hoverImageSrc: './src/assets/project-hover.png'},
        '???' : {imageSrc: './src/assets/anglerfish.png', hoverImageSrc: './src/assets/anglerfish-hover.png'},
        'Setting' : {imageSrc: './src/assets/more.png', hoverImageSrc: './src/assets/more.png'}
    }
    return (
        <div
            className='w-screen h-screen flex flex-col text-black dark:text-white'
        >
            <div
                className='flex flex-row justify-between w-screen h-10 bg-slate-700 solid-black-border font-bold font-code fixed top-0 border-b-0 border-black text-white dark:bg-figma-blue'
            >
                <div
                    className='flex flex-row items-center justify-center space-x-3 pl-6'
                >
                    <img src='./src/assets/slide-thick.png' className='w-10 h-fit'/>
                    <Clock includeDate={false} />
                </div>
                <div className='pr-6 flex flex-row space-x-3 items-center'>
                <p>AthenaOS  </p>
                </div>
             
            </div>
            <div
                className='w-screen h-[100%] mt-10 mb-[6rem] border-[4px] border-black border-t-0 border-b-0 overflow-scroll'
            >
                { renderView()}
            </div>
            <div
                className='flex flex-row items-center justify-around w-screen h-28 bg-figma-yellow solid-black-border dark:bg-slate-700 fixed bottom-0'
            >
                {Object.keys(Tabs).map((key : string) => {
                    const {imageSrc, hoverImageSrc}: any = Tabs[key];
                    const isActiveTab: Boolean = activeTab == key;
                    return (
                    <div className="flex flex-col">
                        <div className="w-16 h-16 relative ">
                            <div 
                                className="absolute w-14 h-14 flex bg-black rounded-xl"
                                style={{left: isActiveTab? '0.25rem' : '0.25rem', top: isActiveTab? '0.25rem' : '0.25rem'}}
                            >
                            </div>
                            <div
                                className='flex flex-col items-center w-14 h-14 rounded-xl z-10 relative bg-white border-black border-[3px]'
                                style={{left: isActiveTab? '0.25rem' : '0rem', top: isActiveTab? '0.25rem' : '0rem'}}
                                onClick= {() => {setActiveTab(key)}}
                            >
                                <img 
                                    src={isActiveTab? hoverImageSrc : imageSrc}
                                />
                            </div>
                        </div>
                        <div className="flex text-center items-center justify-center font-bold">{key}</div>
                     </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Mobile