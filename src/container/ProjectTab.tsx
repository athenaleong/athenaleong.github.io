import React, { Component, useState, useCallback } from 'react';

const ProjectTab: React.FC<any> = ({isMobile=false}:
    {
        isMobile: boolean;
    }) => {
    return (
        <div 
        className="font-bold space-y-7 px-10 h-fit text-xl bg-gray-200 flex flex-col items-center pt-[64px] pb-[96px] font-hanken  dark:bg-gray-800"
        style = {{paddingLeft : isMobile ? '2.5rem' : '6rem', paddingRight: isMobile ? '2.5rem' : '6rem', borderRadius: isMobile ? '0rem' : '0.5rem'}}
        >
            <p className='text-center'>I love playing with different ideas and hack a lot <br/> there are way too many to list <br/> but here some adventures </p>
            <div className="w-[100%] flex flex-col space-y-7">
                <div className='space-y-7 flex flex-col'>
                    {/* Pursuit */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-rainbow-blue rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🏃‍♂️</span>
                            </div>
                            <p className="font-bold">Pursuit</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/pursuit.png" 
                                alt="Pursuit scavenger hunt" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    A month-long city-wide scavenger hunt around San Francisco! 1.5% of SF's population in on the fun.
                                </p>
                                <div className="text-lg">
                                    <a href="https://www.sfpursuit.org" target="_blank" className="text-figma-blue hover:underline">sfpursuit.org</a>
                                    &nbsp;|&nbsp;
                                    <a href="https://www.cbsnews.com/sanfrancisco/news/san-francisco-pursuit-scavenger-hunt/" target="_blank" className="text-figma-blue hover:underline">CBS coverage</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Croissant Study */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-rainbow-yellow rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🥐</span>
                            </div>
                            <p className="font-bold">Finefood.institute</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/croissant.jpg" 
                                alt="Croissant ranking study" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    I roped in 20 friends to scientifically rank ALL the croissants in San Francisco. Double blind.
                                </p>
                                <div className="text-lg">
                                    <a href="https://www.finefood.institute" target="_blank" className="text-figma-blue hover:underline">finefood.institute</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ratatouille IRL */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-rainbow-purple rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🐭</span>
                            </div>
                            <p className="font-bold">Ratatouille IRL</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/ratatouille.jpeg" 
                                alt="Ratatouille animatronic project" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    An animatronic Remy that improves your culinary skills through electric shocks.
                                </p>
                                <div className="text-lg">
                                    <a href="https://www.tiktok.com/@athena.makes/video/7425750355796921630" target="_blank" className="text-figma-blue hover:underline">demo</a>
                                    &nbsp;|&nbsp;
                                    <a href="https://nypost.com/video/woman-makes-animatronic-ratatouille-rat-that-can-move-her-muscles/" target="_blank" className="text-figma-blue hover:underline">NYPost</a>
                                    &nbsp;|&nbsp;
                                    <a href="https://youtu.be/Y0HBiyo3W48?si=2MYcK-P-ToaqMS30&t=1226" target="_blank" className="text-figma-blue hover:underline">Internet Archive talk</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lockin.cafe */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-muted-orange rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">☕</span>
                            </div>
                            <p className="font-bold">Lockin.cafe</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/lockin-cafe.png" 
                                alt="Lockin.cafe lofi workspace" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    Lofi cafe on the internet.
                                </p>
                                <div className="text-lg">
                                    <a href="https://www.lockin.cafe" target="_blank" className="text-figma-blue hover:underline">lockin.cafe</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Obsidian Space Repetition Plugin */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-muted-dark-green rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🧠</span>
                            </div>
                            <p className="font-bold">Obsidian Space Repetition Plugin</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/obsidian.png" 
                                alt="Obsidian Space Repetition Plugin" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    Plugin that enables flashcards with Anki-like spaced repetition in Obsidian.
                                </p>
                                <div className="text-lg">
                                    <a href="https://obsidian.md/plugins?id=spaced-repetition-ai" target="_blank" className="text-figma-blue hover:underline">Obsidian plugin</a>
                                    &nbsp;|&nbsp;
                                    <a href="https://x.com/athenamakes/status/1881219693736042872" target="_blank" className="text-figma-blue hover:underline">demo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidequest */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-muted-blue rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🗺️</span>
                            </div>
                            <p className="font-bold">Field Trip</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/field-trip.jpeg" 
                                alt="Field Trip AI walking guides" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                                                        <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    AI walking guides that pull fascinating stories from whatever's around you. Turn every walk into an adventure!
                                </p>
                                <div className="text-lg">
                                    <a href="https://x.com/athenamakes/status/1600990306056687617" target="_blank" className="text-figma-blue hover:underline">Twitter</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dewy */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-rainbow-green rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🤖</span>
                            </div>
                            <p className="font-bold">Dewy</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/dewey.png" 
                                alt="Dewy AI assistant" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    My personal AI assistant that messages my friends to schedule hangouts in my calendar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mirror of Erised */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-figma-pink rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🪞</span>
                            </div>
                            <p className="font-bold">Mirror of Erised</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-stretch">
                            <img 
                                src="/projects/erised.jpg" 
                                alt="Mirror of Erised art exhibition" 
                                className="w-full md:w-48 rounded-lg solid-black-border object-cover"
                            />
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-normal leading-loose">
                                    An interactive art exhibition that makes your dreams feel real. Exhibited at Fidget Camp 2025.
                                </p>

                            </div>
                        </div>
                    </div>

                </div>

                <div className='space-y-1 flex flex-col'>
                    <p>Some stuff from college days:</p>
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
        </div>
    )
}
export default ProjectTab;
