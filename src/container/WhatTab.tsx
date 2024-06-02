import React, { Component, useState, useCallback } from 'react';

const WhatTab: React.FC<any> = ({isMobile = false}: {
    isMobile?: boolean
}) => {
    return (
    <div 
        className="text-xl font-normal bg-gray-200 text-left flex flex-col items-center pt-[64px] px-[100px] pb-[96px] font-hanken  dark:bg-gray-800"
        style = {{paddingLeft : isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem'}}

    >
    
    <img src={'/play.png'} className='w-[70%] mb-10'/>
    <p className="mb-6 leading-loose w-[100%] font-bold">
        I strive to live with everlasting exuberance.
    </p>
    <p className="mb-6 leading-loose">
        I love skipping down the streets; when I'm happy, I dance with abandon. I find our universe deeply fascinating - how cool is it that billions of years of happenings have led to life as we know it. I bathe in this wonder. I learn by making, and I hope to share my wonder through the projects I work on!
    </p>
    <p className="mb-6 leading-loose">
        I had a rather unconventional childhood. I started boarding school when I was 6 and grew up fiercely independent. I fell in love with science and coding when I was 13. I spent all of my teen wrangling the Singapore education system so I could do more of what I love. This resulted in many breaks spent hacking in the restroom and holidays spent in the science lab. 
    </p>
    <p className="mb-6 leading-loose">
        For the last 3 years, I have devoted my craft to building digital experiences for children. It brings me immense joy and fulfillment, and I have loved nothing else more. I have an insatiable thirst to understand things deeply and use those insights to create meaningful work that makes a difference. This yearn for knowledge has led me down many fascinating rabbit holes - I have spent a lot of my free time observing in schools and recently came back from a 3-month trip where I shadowed educators around Scandinavia.
    </p>
    <div className='mb-10 flex justify-center'>
        <img src={'/experiences.png'} className='w-[70%]'/>
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
