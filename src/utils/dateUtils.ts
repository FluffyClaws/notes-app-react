export const formatDate = (dateString: string) => {
  const dateParts = dateString.split(/[/, :]/);
  const day = dateParts[0].toString().padStart(2, "0");
  const month = dateParts[1].toString().padStart(2, "0");
  const year = dateParts[2];
  const hours = dateParts[3] ? dateParts[3].toString().padStart(2, "0") : "00";
  const minutes = dateParts[4]
    ? dateParts[4].toString().padStart(2, "0")
    : "00";

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
