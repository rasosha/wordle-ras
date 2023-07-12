const formatData = (type: string, date: number): string => {
  if (type === 'time') {
    const hrs = new Date(new Date(date)).getUTCHours().toString().padStart(2, '0');
    const min = new Date(new Date(date)).getUTCMinutes().toString().padStart(2, '0');
    const sec = new Date(new Date(date)).getUTCSeconds().toString().padStart(2, '0');
    return hrs + ':' + min + ':' + sec;
  } else if (type === 'date') {
    const year = new Date(new Date(date)).getUTCFullYear().toString().padStart(2, '0');
    const mon = (new Date(new Date(date)).getUTCMonth() + 1).toString().padStart(2, '0');
    const day = new Date(new Date(date)).getUTCDate().toString().padStart(2, '0');
    return year + '.' + mon + '.' + day;
  }
  return ''
};

export default formatData