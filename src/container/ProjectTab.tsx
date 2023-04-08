import React, { Component, useState, useCallback } from 'react';

const ProjectTab: React.FC<any> = ({isMobile=false}:
    {
        isMobile: boolean;
    }) => {
    return (
        <div 
        className="font-bold space-y-5 px-10 h-fit text-xl bg-gray-200 flex flex-col items-center pt-[64px] pb-[96px] font-hanken  dark:bg-gray-800"
        style = {{paddingLeft : isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem'}}
        >
            <p className='text-center'> 🚧 This Tab is outdated and under construction.🚧 <br/> Here's your hard hat ⛑</p>
            <div className="w-[100%] flex flex-col space-y-5">
                <p>For now check out:</p>
                <a href="https://www.youtube.com/watch?v=2WZ-GL2cJlM">
                    <p>Phyzmo: Motion tracking for physics</p>
                </a>
                <a href="https://amigu.webflow.io/">
                    <p>Amigu: Tamagotchi for building parent-child relationship </p>
                </a>
                <a href="https://devpost.com/software/wherefi">
                    <p>Wherefi: Geiger counter for wifi signal</p>
                </a>
                <a href="https://aorticpump.athenaleong.com/">
                    <p>Aortic Pump: Sentence sophiscator </p>
                </a>
                <a href="https://emojicannon.webflow.io/">
                    <p>Emoji cannon: Blast your screen with emojis </p>
                </a>
                <a href="https://a-colorful-thing.vercel.app/">
                    <p>A Colorful Thing: Simple collaborative pixel painting web app</p>
                </a>
                <a href="https://www.youtube.com/watch?v=O3tr3pSMPho&ab_channel=AthenaLeong">
                    <p>Motifs & Pattern: Animations built with processing</p>
                </a>
                <a href="https://www.youtube.com/watch?v=EBlkpBf28S8&ab_channel=JiHyunLee">
                    <p>Berkeleyland</p>
                </a>
                <a href="https://athenaleong.notion.site/athenaleong/Doodles-e6b6f3cde2d64de5a3fa9382972c6ff0">
                    <p>Doodles</p>
                </a>
            </div>
        </div>
    )
}
export default ProjectTab;
