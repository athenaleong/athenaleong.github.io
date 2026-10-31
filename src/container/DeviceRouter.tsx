import React, { useLayoutEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import Desktop from './Desktop';
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' 
import Mobile from './Mobile';
import RotateScreen from '../component/RotateScreen';

const DeviceRouter: React.FC<any> = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 991px)" });
    const isLaptop = useMediaQuery({ query: "(min-width: 992px)" });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    useLayoutEffect(() => {
      // Reveal the committed interface before paint; decorative images can
      // finish loading independently instead of holding up the entire site.
      document.body.classList.add('playground-ready');
      document.dispatchEvent(new Event('playground-ready'));
      return () => document.body.classList.remove('playground-ready');
    }, []);

    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            {isMobile && isPortrait && <Mobile />}
            {isMobile && !isPortrait && <RotateScreen />}
            {isTablet && <Desktop />}
            {isLaptop && <Desktop />}
        </DndProvider>
    )

}

export default DeviceRouter;
