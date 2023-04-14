import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddIcon from '@mui/icons-material/Add';

import Event from './Event';

export default function EventDialogue({ open, setOpen, target, addEvent }) {
  const [event, setEvent] = useState(new Event(new Date(target), [""]));

  const updateEvent = (action, newValue, extraValues) => {
    let newEvent = event.getCopy();

    switch(action) {
      case 'parent':
        newEvent.customer = newValue;
        break;
      case 'summary':
        newEvent.summary = newValue;
        break;
      case 'time':
        newEvent.startTime = newValue;
        break;
      case 'dogs-update':
        const dogID = extraValues[0];
        newEvent.dogs[dogID] = newValue;
        break;
      case 'dogs-add':
        newEvent.dogs.push("");
        break;
    }

    setEvent(newEvent);
  }

  const handleSave = () => {
    // Save the calendar event to your database or API
    setOpen(false);
  };

  useEffect(() => {
    updateEvent("time", new Date(target), [])
  }, [open, target]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Request Lesson</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            component="li"
            autoFocus
            margin="dense"
            id="name"
            label="Customer Name"
            type="text"
            fullWidth
            value={event.customer}
            onChange={(event) => updateEvent("parent", event.target.value, [])}
          />

          <Box
            style={{
              display: 'flex',
              margin: '8px 0px 3px',
            }}
          >
            <DatePicker
              id="date"
              label="Date"
              value={event.startTime}
              onChange={(event) => updateEvent("time", event.target.value, [])}
              fullWidth
              DayPickerProps={{ format: 'DD/MM/YYYY' }}
              flexItem
              sx={{
                marginRight: "4px"
              }}
            />
            
            <TimePicker
              id="time"
              label="Time"
              value={event.startTime}
              onChange={(event) => updateEvent("time", event.target.value, [])}
              fullWidth
              flexItem
            />
          </Box>

          <br />
          <Typography>Customer's Dogs:</Typography>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >

            <Box
              style={{
                display: 'flex',
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="dog-0"
                label="Name"
                type="text"
                value={event.dogs[0]}
                onChange={(event) => updateEvent("dogs-update", event.target.value, [0])}
                sx={{
                  flex: '1 0 auto',
                  marginRight: '4px',
                }}
              />

              <TextField
                  autoFocus
                  margin="dense"
                  id="dog-0"
                  label="Age"
                  type="text"
                  sx={{
                    flex: '0.5 2 auto',
                    marginRight: '4px',
                  }}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="dog-0"
                    label="Breed"
                    type="text"
                    sx={{
                      flex: '0.5 2 auto',
                    }}
                  />
            </Box>

            <IconButton
              color="primary"
              aria-label="add another dog"
              onClick={() => updateEvent("dogs-add", "", [])}
            >
              <AddIcon
                color="primary"
                fontSize="large"
              />
            </IconButton>
          </Box>
          
          {event.dogs.map((dog, index) => {
            if (index != 0)
              return (
                <Box
                  key={"dog-" + index}
                  style={{
                    display: 'flex',
                  }}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id={"dog-name-" + index}
                    label="Dog's Name"
                    type="text"
                    fullWidth
                    value={event.dogs[index]}
                    onChange={(event) => updateEvent("dogs-update", event.target.value, [index])}
                    sx={{
                      flex: '1 0 auto',
                      marginRight: '4px',
                    }}
                  />

                  <TextField
                      autoFocus
                      margin="dense"
                      id={"dogAge-" + index}
                      label="Age"
                      type="text"
                      sx={{
                        flex: '0.5 2 auto',
                        marginRight: '4px',
                      }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id={"dogBreed-" + index}
                        label="Breed"
                        type="text"
                        sx={{
                          flex: '0.5 2 auto',
                        }}
                      />
                </Box>
              )
          })}
          
          <TextField
            id="summary"
            label="What Am I Looking For In Out Of Lessons?"
            placeholder="Please give a (hopefully brief) summary of why you are seeking a lesson with us."
            margin="dense"
            multiline
            fullWidth
            minRows={4}
            value={event.summary}
            onChange={(event) => updateEvent("summary", event.target.value, [])}
          />
        </form>
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