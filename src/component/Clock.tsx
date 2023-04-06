import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Clock = ({includeDate = true} : {
    includeDate?: boolean;
}) => {
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

  const formattedTime = includeDate ? 
                        format(currentTime, 'MMM dd h:mma') : 
                        format(currentTime, 'h:mma');
  return <div>{formattedTime}</div>;
};

export default Clock;
