import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [value, setValue] = React.useState(null);

  // To be replaced or substituted by a given set of options
  const slotOptions = {
    duration: 30,
    restBefore: 0,
    restAfter: 0,
    startTime: 8,
    endTime: 17,
    gapTimes: [(12, 13)],
    daysActive: [false, true, true, true, true, true, false]
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    // Save the calendar event to your database or API
    setOpen(false);
  };

  return (
    <div className="MainCalendar">

      {/* <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Create Event
      </Button> */}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />

          <DatePicker
            margin="dense"
            id="date"
            label="Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            fullWidth
            DayPickerProps={{ format: 'DD/MM/YYYY' }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}