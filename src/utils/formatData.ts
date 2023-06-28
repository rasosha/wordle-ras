const formatData = (date: number) => {
  if (date) {
    const hrs = new Date(new Date(date)).getHours().toString().padStart(2, '0');
    const min = new Date(new Date(date)).getMinutes().toString().padStart(2, '0');
    const sec = new Date(new Date(date)).getSeconds().toString().padStart(2, '0');
    return hrs + ':' + min + ':' + sec;
  }
};

export default formatData