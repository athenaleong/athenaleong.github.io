import React from "react";

const DockerWrapper: React.FC<DockerWrapperProps> = ({children}) => {

    return (
        <div 
            className='w-16 h-16 relative bottom-8 hover:animate-bounce'
        >
            {children}
        </div>
    )
};

interface DockerWrapperProps {
    children: React.ReactNode;
}
export default DockerWrapper;