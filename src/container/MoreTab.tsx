import ThemeToggle from "../component/ThemeToggle";

const MoreTab = () => {

    return (
        <div 
        className="space-y-8 h-full text-xl bg-gray-200 flex flex-col px-[2.5rem] items-center pt-[64px] pb-[96px] font-hanken font-bold dark:bg-gray-800"
        >
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <p> Theme </p>
                <ThemeToggle />
            </div>
            <p
            className="font-bold w-full"
            > 
                Find me here: 
            </p>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a 
                className="flex flex-row justify-start items-center w-full space-x-8"
                href="https://garden.athenaleong.com" target="_blank">
                        <img src='/garden.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                        <p>I have a digital garden!</p>
                </a>
            </div>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a 
                className="flex flex-row justify-start items-center w-full space-x-8"
                href="https://github.com/athenaleong" target="_blank">
                        <img src='/github.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                        <p>@athenaleong</p>
                </a>
            </div>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a 
                className="flex flex-row justify-start items-center w-full space-x-8"
                href="https://x.com/athenamakes" target="_blank">
                        <img src='/twitter.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                        <p>@athenamakes</p>
                </a>
            </div>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a 
                className="flex flex-row justify-start items-center w-full space-x-8"
                href="https://www.tiktok.com/@athena.makes" target="_blank">
                        <img src='/tiktok.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                        <p>@athena.makes</p>
                </a>
            </div>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a
                    className="flex flex-row justify-start items-center w-full space-x-8" 
                    href="mailto:athenaleong619&#64;gmail&#46;com"
                >
                    <img src='/mail.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                    <p>Email</p>
                </a>  
            </div>
        </div>
    )
};

export default MoreTab;