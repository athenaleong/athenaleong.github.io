import React, {useState, useEffect} from 'react';
import { useMediaQuery } from "react-responsive";
import Desktop from './Desktop';
import { DndProvider } from 'react-dnd'
import { MultiBackend } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch' 
import Mobile from './Mobile';
import Loading from './Loading';

const DeviceRouter: React.FC<any> = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 991px)" });
    const isLaptop = useMediaQuery({ query: "(min-width: 992px)" });

    const [loading, setLoading] = useState(false);

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
        '/slide-thick.png'
    ]

    const promises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(promises)
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            {loading && <Loading/>}
            {!loading && isMobile && <Mobile />}
            {!loading && isTablet && <Desktop />}
            {!loading && isLaptop && <Desktop />}
        </DndProvider>
    )

}

export default DeviceRouter;