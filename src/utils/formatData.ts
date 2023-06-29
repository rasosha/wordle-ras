const formatData = (type: string, date: number) => {
  if (type === 'time') {
    if (date) {
      const hrs = new Date(new Date(date)).getHours().toString().padStart(2, '0');
      const min = new Date(new Date(date)).getMinutes().toString().padStart(2, '0');
      const sec = new Date(new Date(date)).getSeconds().toString().padStart(2, '0');
      return hrs + ':' + min + ':' + sec;
    }
  } else if (type === 'date') {
    if (date) {
      const year = new Date(new Date(date)).getUTCFullYear().toString().padStart(2, '0');
      const mon = (new Date(new Date(date)).getUTCMonth() + 1).toString().padStart(2, '0');
      const day = new Date(new Date(date)).getUTCDate().toString().padStart(2, '0');
      return year + '.' + mon + '.' + day;
    }
  }
};

export default formatData