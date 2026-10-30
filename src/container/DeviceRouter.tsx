import React, {useState, useEffect} from 'react';
import { useMediaQuery } from "react-responsive";
import Desktop from './Desktop';
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' 
import Mobile from './Mobile';
import Loading from './Loading';
import RotateScreen from '../component/RotateScreen';

const DeviceRouter: React.FC<any> = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 991px)" });
    const isLaptop = useMediaQuery({ query: "(min-width: 992px)" });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const images = [
        '/experiences.png',
        '/about.png',
        '/about-hover.png',
        '/project.png',
        '/project-hover.png',
        '/anglerfish.png',
        '/anglerfish-hover.png',
        '/garden.png',
        '/garden-hover.png',
        '/play.png',
        '/github.png',
        '/twitter.png',
        '/mail.png',
        '/more.png',
        '/slide-thick.png',
        '/tiktok.png'
    ]

    let cancelled = false;
    const finishLoading = () => { if (!cancelled) setLoading(false); };
    // A missing or slow decorative icon must never block access to the site.
    const timeout = window.setTimeout(finishLoading, 2500);
    const promises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.allSettled(promises).then(() => {
      window.clearTimeout(timeout);
      finishLoading();
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

    useEffect(() => {
      if (!loading) document.body.classList.add('playground-ready');
      return () => document.body.classList.remove('playground-ready');
    }, [loading]);

    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            {loading && <Loading/>}
            {!loading && isMobile && isPortrait && <Mobile />}
            {!loading && isMobile && !isPortrait && <RotateScreen />}
            {!loading && isTablet && <Desktop />}
            {!loading && isLaptop && <Desktop />}
        </DndProvider>
    )

}

export default DeviceRouter;
