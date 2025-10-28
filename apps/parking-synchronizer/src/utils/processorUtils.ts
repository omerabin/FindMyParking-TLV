export const getFormattedDate = (dateString: string): Date => {
  const [day, month, yearAndTime] = dateString.split('/');
  const [year, time] = yearAndTime.split(' ');
  const isoString = `${year}-${month}-${day}T${time}`;
  return new Date(isoString);
};
