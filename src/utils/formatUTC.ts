import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formatUTC = (date: Date, type?: string): string => {
  const time = dayjs(date).utc().format();
  switch (type) {
    case 'time':
      return dayjs(time).utc().format('HH:mm:ss');
    case 'date':
      return dayjs(time).utc().format('YYYY.MM.DD');
    default:
      return dayjs(time).utc().format();
  }
};

export default formatUTC;
