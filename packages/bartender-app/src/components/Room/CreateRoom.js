import React from 'react';
import { KeyboardDatePicker } from "@material-ui/pickers";

const CreateRooom = () => {
    return <KeyboardDatePicker
    autoOk
    variant="inline"
    inputVariant="outlined"
    label="Choose a date for the event"
    format="MM/dd/yyyy"
    // value={selectedDate}
    InputAdornmentProps={{ position: "start" }}
    // onChange={date => handleDateChange(date)}
  />
}

export default CreateRooom