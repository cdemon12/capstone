const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Chicago' };

const pub_date = new Date('2022-06-18').toLocaleString('en-US', options);

export { pub_date } 