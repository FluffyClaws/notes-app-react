export const extractDatesFromContent = (text: string) => {
  const dateRegex = /(\d{1,2}[/.]\d{1,2}[/.]\d{4})/g;
  const datesFound = text.match(dateRegex);
  return datesFound ? datesFound.map((date) => date.replace(/\./g, "/")) : [];
};
