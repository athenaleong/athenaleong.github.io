import ThemeToggle from "../component/ThemeToggle";

const SettingTab = () => {

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
                href="https://github.com/athenaleong" target="_blank">
                        <img src='./src/assets/github.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                        <p>@athenaleong</p>
                </a>
            </div>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a 
                className="flex flex-row justify-start items-center w-full space-x-8"
                href="https://twitter.com/thenabanana" target="_blank">
                        <img src='./src/assets/twitter.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                        <p>@thenabanana</p>
                </a>
            </div>
            <div
            className="flex flex-row justify-between items-center w-full"
            > 
                <a
                    className="flex flex-row justify-start items-center w-full space-x-8" 
                    href="mailto:athenaleong619&#64;gmail&#46;com"
                >
                    <img src='./src/assets/mail.png' className='w-10 h-10 bg-white p-2 rounded-xl'/>
                    <p>Email</p>
                </a>  
            </div>
        </div>
    )
};

export default SettingTab;