import React from "react";

interface Props {
  dates: string[];
}

const DateList: React.FC<Props> = ({ dates }) => {
  return <>{dates.join(", ")}</>;
};

export default DateList;
