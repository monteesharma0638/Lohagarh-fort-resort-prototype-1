import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }: {timestamp: string | number}) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  return <>{timeAgo}</>; // Outputs "3 weeks ago"
};


export default TimeAgo;