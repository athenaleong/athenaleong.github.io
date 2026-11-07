import Clock from "../component/Clock"
import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { MobileTabDict } from "../type/tab"
import AboutTab from "./AboutTab"
import ProjectTab from "./ProjectTab"
import WhatTab from "./WhatTab"
import { render } from "react-dom"
import { id } from "date-fns/locale"
import MoreTab from "./MoreTab"

const mobileLinks: Record<string, string> = { About: '/about/', Projects: '/projects/', '???': '/story/', More: '/about/#contact' };

type MobileTabs = 'About' | 'Projects' | '???' | 'More'


const Mobile = () => {

    const [activeTab, setActiveTab] = useState<string>('About')
    const contentRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        // The tabs share this scroll container; start each new tab at the top.
        contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [activeTab])

    const renderView = useCallback(() => {
        switch (activeTab) {
            case 'About':
                return (<AboutTab isMobile={true}/>)
            case 'Projects':
                return (<ProjectTab isMobile={true}/>)
            case '???':
                return (<WhatTab isMobile={true}/>)
            case 'More':
                return (<MoreTab />)
            
        }

    }, [activeTab])
    const Tabs: MobileTabDict = {
        'About': {
            imageSrc:'/optimized/about.webp',
            hoverImageSrc: '/optimized/about-hover.webp'
        },
        'Projects' : {imageSrc: '/optimized/project.webp', hoverImageSrc: '/optimized/project-hover.webp'},
        '???' : {imageSrc: '/optimized/anglerfish.webp', hoverImageSrc: '/optimized/anglerfish-hover.webp'},
        'More' : {imageSrc: '/optimized/more.webp', hoverImageSrc: '/optimized/more.webp'}
    }
    return (
        <div
            className='w-screen h-screen flex flex-col text-black dark:text-white'
        >
            <h1 className="sr-only">Athena Leong's Playground</h1>
            <div
                className='flex flex-row justify-between items-center gap-2 px-3 w-screen h-10 bg-slate-700 solid-black-border font-bold font-code text-sm fixed top-0 border-b-0 border-black text-white dark:bg-figma-blue'
            >
                <div
                    className='flex flex-row items-center gap-2 whitespace-nowrap'
                >
                    <img src='/optimized/slide-thick.webp' className='w-8 h-auto' alt=""/>
                    <p>AthenaOS</p>
                </div>
                <div className='flex flex-row gap-2 items-center whitespace-nowrap'>
                    <span>SF, CA</span>
                    <Clock includeDate={false} />
                </div>
             
            </div>
            <div
                ref={contentRef}
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
                    <div className="flex flex-col" key={key}>
                        <div className="w-16 h-16 relative ">
                            <div 
                                className="absolute w-14 h-14 flex bg-black rounded-xl"
                                style={{left: isActiveTab? '0.25rem' : '0.25rem', top: isActiveTab? '0.25rem' : '0.25rem'}}
                            >
                            </div>
                            <a
                                className='flex flex-col items-center w-14 h-14 rounded-xl z-10 relative bg-white border-black border-[3px]'
                                style={{left: isActiveTab? '0.25rem' : '0rem', top: isActiveTab? '0.25rem' : '0rem'}}
                                href={mobileLinks[key]}
                                aria-label={key === '???' ? 'My story' : key}
                                aria-current={isActiveTab ? 'page' : undefined}
                                onClick={(event) => {
                                    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
                                    event.preventDefault();
                                    setActiveTab(key);
                                }}
                            >
                                <img 
                                    src={isActiveTab? hoverImageSrc : imageSrc}
                                    alt=""
                                />
                            </a>
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
