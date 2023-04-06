import React from 'react';
import { useMediaQuery } from "react-responsive";
import Desktop from './Desktop';
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' 

const DeviceRouter: React.FC<any> = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 991px)" });
    const isLaptop = useMediaQuery({ query: "(min-width: 992px)" });

    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            {isMobile && <div>Mobile</div>}
            {isTablet && <Desktop />}
            {isLaptop && <Desktop />}
        </DndProvider>
    )

}

export default DeviceRouter;