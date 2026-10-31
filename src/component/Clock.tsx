import { useState, useEffect } from 'react';
import { formatSanFranciscoTime } from '../lib/clock';

const Clock = ({includeDate = true} : {
    includeDate?: boolean;
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      setCurrentTime(new Date());
      timeout = setTimeout(tick, 60000 - Date.now() % 60000);
    };
    tick();
    return () => clearTimeout(timeout);
  }, []);

  return <div>{formatSanFranciscoTime(currentTime, includeDate)}</div>;
};

export default Clock;
