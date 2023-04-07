import React, { Component, useState, useCallback } from 'react';

const AboutTab: React.FC<any> = ({isMobile = false}:{
    isMobile: boolean;
}) => {
    return (
        // <div className='w-[600px] h-[600px] bg-yellow-300'>
        //     <h1>About</h1>
        // </div>
    <div 
        className="text-xl bg-gray-200 flex flex-col items-center pt-[64px] pb-[96px] font-hanken  dark:bg-gray-800"
        style = {{paddingLeft : isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem'}}
    >
    
    <img />
    <p className="mb-6 leading-loose font-bold">
        Hi! Looks like you have stumbled upon my little playground on the internet. Welcome in! 
    </p>
    {/* TODO Fix weird bug where there's extra space */}
    <p className="mb-3 leading-loose">
        I am Athena. I am curious about a lot of things. I am most interested in reimagining childhood with tech. Whether that is designing better ways of learning, simplifying parenthood, or helping every child find their champion.
    </p>
    ‍<p className="mb-6 leading-loose">
        When I am not beep booping at 
        <a href='https://www.cs.berkeley.edu/' target="_blank">
            &nbsp; UC Berkeley
        </a>
    , I am a research assistant at  
    <a href='http://www.gopniklab.berkeley.edu/' target="_blank">
    &nbsp;Gopnik Lab&nbsp;
    </a>
    where I study how kids explore. I am also building Amigu, an adventure game to facilitate better conversations between parent and child. You may also find me at hacking away at noisebridge, taste-testing intriguing groceries or playing at an actual playground!
    </p>
    <p className=" mb-6 leading-loose">
    Previously, I taught ML with
    <a href='https://ml.berkeley.edu/' target="_blank">
    &nbsp;Machine Learning @ Berkeley&nbsp;
    </a>
     and worked on many ML projects. Back in Singapore, I started makerspaces, built communities for technical people and made silly youtube videos about Lego!
  </p>
  <p className=" mb-6 leading-loose">
    I love thinking and exploring with people. If you think we should be friends, please let me know - There are 7.7 billion people on this planet, how cool is it that you found me!
  </p>
    <p className=" mb-6 leading-loose">
        I built this playground just for adventurers like you! Go forth, I hope you have lots of fun here!
    </p>
</div>


    )
}
export default AboutTab;
