import React from "react";
import { DateListProps } from "../store/types";

const DateList: React.FC<DateListProps> = ({ dates }) => {
  return <>{dates.join(", ")}</>;
};

export default React.memo(DateList);
