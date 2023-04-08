import {PacmanLoader} from 'react-spinners'   

const Loading = () => {
    return (
        <div className="w-screen h-screen bg-black flex flex-col justify-center items-center">
            <PacmanLoader color="#FFCB2F" />
        </div>
    )
}

export default Loading