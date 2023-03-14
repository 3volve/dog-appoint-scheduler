import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EventDialogue({ open, setOpen }) {
  const [date, setDate] = React.useState(null);
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    // Save the calendar event to your database or API
    setOpen(false);
  };

  return (
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
          value={date}
          onChange={(newValue) => setDate(newValue)}
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
  );
}