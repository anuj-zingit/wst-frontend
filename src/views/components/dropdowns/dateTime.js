import React, { useState } from "react";
import Button from "../../components/buttons/DefaultButton";
import DateTimePicker from "react-datetime-picker";

export default function DateAndTimePickers(props) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div style={{minWidth:"200px"}} >  
      <DateTimePicker
        onChange={(date) => setStartDate(date)}
        value={startDate}
      />
      <div style={{ padding: "10px" }}>
        <Button onClick={() => props.onSave(startDate)} name="Save" />
      </div>
    </div>
  );
}
