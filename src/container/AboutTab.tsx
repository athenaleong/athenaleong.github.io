import React, { Component, useState, useCallback } from 'react';

const AboutTab: React.FC<any> = ({isMobile = false}:{
    isMobile: boolean;
}) => {
    return (
    <div 
        className="text-xl bg-gray-200 flex flex-col items-center pt-[64px] pb-[96px] font-hanken  dark:bg-gray-800"
        style = {{paddingLeft : isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem'}}
    >
    
    <img />
    <p className="mb-6 leading-loose font-bold">
        Hi! Looks like you have stumbled upon my little playground on the internet. Welcome in! 
    </p>
    {/* TODO Fix weird bug where there's extra space */}
    <p className="mb-6 leading-loose">
        I am Athena. I am curious about a lot of things. I am most interested in designing childhood experiences with tech. This could look like designing better interfaces for learning, or helping every child find their champion.
    </p>
    <p className="leading-loose">
        I love whimsical things and getting into shenanigans with friends. Sometimes, I document them on my 
        <a href='https://www.tiktok.com/@athena.banana' target="_blank">
        &nbsp;Tiktok
        </a>
        .
    </p>
    ‍<p className="mb-6 leading-loose">
        Previously, I did CS & child development at 
        <a href='https://www.cs.berkeley.edu/' target="_blank">
            &nbsp; UC Berkeley
        </a>
        .
    I've developed Amigu, an adventure game that transforms conversations between parents and children into an exciting journey.
    I also taught ML with
    <a href='https://ml.berkeley.edu/' target="_blank">
    &nbsp;Machine Learning @ Berkeley&nbsp;
    </a>
     and worked on many ML projects.
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
