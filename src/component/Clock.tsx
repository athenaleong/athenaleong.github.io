import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const seconds = now.getSeconds();
      const delay = (60 - seconds) * 1000 - now.getMilliseconds();
      setTimeout(() => {
        setCurrentTime(new Date());
      }, delay);
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = format(currentTime, 'MMM dd h:mma');

  return <div>{formattedTime}</div>;
};

export default Clock;
