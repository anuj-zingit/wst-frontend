import { month } from "../constants/modes";
import React from "react";

export const isValidDate = (dateString,allowEmpty = false) => {
  if(allowEmpty && !dateString){
    return true;
  }
  let today = new Date();

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);


  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  if(today < new Date(dateString)){
    return false
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

export const dateFormatter = (date_in = '') => {
  let truncIndex = date_in.search("AM");
  if (truncIndex === -1) {
    truncIndex = date_in.search("PM");
  }
  let startDateTemp = new Date(date_in.substring(0, truncIndex - 1));
  let startDate = {};
  startDate.month = startDateTemp.getMonth() + 1;
  startDate.year = startDateTemp.getFullYear();
  startDate.date = startDateTemp.getDate();
  startDate.hours = startDateTemp.getHours();
  startDate.minutes = startDateTemp.getMinutes();

  return (
    <>
      {startDate.year === new Date().getFullYear() &&
      startDate.month === new Date().getMonth() + 1 &&
      startDate.date === new Date().getDate() ? (
        <>Today <br/>{startDate.hours}:{startDate.minutes < 10 ? '0':''}{startDate.minutes} {date_in.substring(truncIndex,truncIndex+2)}</>
      ) : (
        <>
          {month[startDate.month - 1]} {startDate.date}{" "}
          {startDate.year === new Date().getFullYear() ? "" : startDate.year}
        </>
      )}
    </>
  );
};
