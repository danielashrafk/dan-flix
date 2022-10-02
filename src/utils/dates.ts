import * as _ from "lodash";
import { IMovie, MovieState } from "../store/models";

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return "Today, " + date + " " + months[month]; //format: dd-mm-yyyy;
};

export const getMonth = (date: Date) => {
  const month = date.toString().split("-")[1];

  return months[parseInt(month) - 1];
};

export const getDay = (date: Date) => {
  let month = date.toString().split("-")[2];
  if (_.isEqual(month.charAt(0), "0")) {
    month = month.charAt(month.length - 1);
  }
  if (
    (month.length > 1 && !_.isEqual(month.charAt(month.length - 2), "1")) ||
    month.length == 1
  ) {
    if (_.isEqual(month.charAt(month.length - 1), "1")) {
      return month + "st";
    } else if (_.isEqual(month.charAt(month.length - 1), "2")) {
      return month + "nd";
    } else if (_.isEqual(month.charAt(month.length - 1), "3")) {
      return month + "rd";
    }
  }
  return month + "th";
};

export const partitionDates = (movies: MovieState["movies"]) => {
  let partitionedArray: Array<Array<IMovie>> = [];

  const uniqueDates = _.orderBy(
    _.uniq(_.map(movies, "release_date")),
    [],
    ["asc"]
  );

  uniqueDates.map((date) => {
    partitionedArray.push(_.filter(movies, ["release_date", date]));
  });

  return partitionedArray;
};
