import React, { Component, useState, useCallback } from 'react';

const WhatTab: React.FC<any> = ({isMobile = false}: {
    isMobile?: boolean
}) => {
    return (
    <div 
        className="text-xl font-normal bg-gray-200 text-left flex flex-col items-center pt-[64px] px-[100px] pb-[96px] font-hanken  dark:bg-gray-800"
        style = {{paddingLeft : isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem'}}

    >
    
    <img src={'/play.png'} className='w-[70%] mb-10' alt="An illustration of play and exploration"/>
    <p className="mb-6 leading-loose w-[100%] font-bold">
        I strive to live with everlasting exuberance.
    </p>
    <p className="mb-6 leading-loose">
        I love skipping down the streets; when I'm happy, I dance with abandon. I find our universe deeply fascinating. How cool is it that the top of Everest was once seafloor, and we've gone from counting with stones to fitting billions of transistors on a chip! I bathe in the wonder of this beautiful world, and I hope to share this wonder through the projects I work on!
    </p>
    <p className="mb-6 leading-loose">
        I had a rather unconventional childhood. I started boarding school when I was 6 and grew up fiercely independent. I fell in love with science and coding when I was 13. I spent my teenage years wrestling with the Singapore education system so I could work on my own projects instead of doing homework. This resulted in many breaks spent hacking in the restroom and holidays spent in the science lab.
    </p>
    <p className="mb-6 leading-loose">
        For the last 7 years, I have devoted my craft to building magical experiences with technology. It brings me immense joy and fulfillment, and I have loved nothing else more.
    </p>
    <p className="mb-6 leading-loose">
        As a technologist, I care about understanding things deeply and creating meaningful work. I also believe strongly in balancing that with experimenting rapidly and learning from failure.
    </p>
    <p className="mb-6 leading-loose">
        I believe exceptional craft can carry across fields. I look up to people like James Cameron, who makes films and explores the deep sea; Hank Green, who teaches science, writes novels and builds businesses; and Kathleen Martínez, who went from practicing law to searching for Cleopatra’s tomb.
    </p>
    <div className='mb-10 flex justify-center'>
        <img src={'/experiences.png'} className='w-[70%]' alt="A collage of Athena's experiences" loading="lazy"/>
    </div>
    <p className="mb-6 leading-loose">
        I care deeply about the journey and I am most grateful for my friends who traverse this journey with me. Their authentic presence and zest for life inspire me every day. They are like anglerfish! They show me everlasting exuberance in moments of darkness. I want to this journey to be true to myself and my values, with an abundance of joy, wide-eyed curiosity, thoughtfulness and anglerfish!
    </p>
    <p className="mb-6 leading-loose">
    </p>
    </div>
    )
}
export default WhatTab;
