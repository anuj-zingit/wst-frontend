import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import PickyDateTime from "react-picky-date-time";
// import DefaultButton from "../buttons/DefaultButton";
// import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 800,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div class="schedule-time-date">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disablePast
            placeholder="jhbjhvjhv"
            margin="normal"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            value={props.date || new Date()}
            variant="filled"
            onChange={props.onSave}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardTimePicker
              keyboardIcon={<div className="clock-iconname"><img src='../../../images/icons/clock-grey.png'/></div>}
            margin="normal"
            id="time-picker"
            // label="Time"
            value={props.date || new Date()}
            onChange={props.onSave}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
