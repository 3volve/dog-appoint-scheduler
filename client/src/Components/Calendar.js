import React, { useState } from 'react';
import { Paper, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import { EventSlot } from './Slots.js';
import EventDialogue from './EventDialogue.js';

export default function Calendar({ events }) {
  const [open, setOpen] = useState(false);;
  const times = [];
  const timesDash = [<Box className="SlotTimesDash"/>]
  const slots = [];
  const days = [];

  // To be replaced or substituted by a given set of options
  const slotOptions = {
    duration: 30,
    restBefore: 0,
    restAfter: 0,
    startTime: 8,
    endTime: 17,
    gapTimes: [(12, 13)],
    daysActive: [0, 1, 1, 1, 1, 1, 0]
  } // Note: I might want to alter the times to be Date Objects so that they can be adjusted for localization if needed.

  let numDays = slotOptions.daysActive.reduce((accumulator, currentVal) => accumulator + currentVal);
  let numSlots = slotOptions.endTime - slotOptions.startTime; // Need to subtract by gap times for numSlots
  const [slotContents, setSlotContents] = useState(Array(7 * numSlots).fill("Available Slot"));

  initDayHeaders(slotOptions, days, numDays, numSlots);
  initSlots(slotOptions, slots, slotContents, times, timesDash, numDays, numSlots);
  fillEvents(events, numSlots);

  return (
    <Paper className="MainCalendar">
      <Box className="LeftSide">{times}</Box>
      <Box className="LeftSide">{timesDash}</Box>

      <Box className="RightSide">
        <Grid container spacing={0}>{days}</Grid>
        <Grid container spacing={0}>{slots}</Grid>
      </Box>

    { // Eventually this button function is going to be transitioned to be attached to open slots that will pass along info about them to the EventDialogue object.
    /* <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
      Create Event
    </Button> */}

      <EventDialogue open={open} setOpen={setOpen} />
    </Paper>
  );
}

// Instantiate the day headers
function initDayHeaders(slotOptions, days, numDays, numSlots) {
  let today = new Date();
  let date = today;
  
  slotOptions.daysActive.forEach((day, index) => {
    if (day) {
      let content = "";
      date.setDate(today.getDate() - today.getDay() + index);

      switch(index) {
        case 0: content = "SUN"
          break;
        case 1: content = "MON"
          break;
        case 2: content = "TUE"
          break;
        case 3: content = "WED"
          break;
        case 4: content = "THU"
          break;
        case 5: content = "FRI"
          break;
        case 6:  content = "SAT"
          break;
      }
      content += " | " + date.getDate();

      days.push(
        EventSlot({
          id: content,
          day: date,
          numDays: numDays,
          numSlots: numSlots,
          content: content
        })
      );
    }
  });
}

// Instantiate the Slots & Slot Times
function initSlots(slotOptions, slots, slotContents, times, timesDash, numDays, numSlots) {
  let today = new Date();
  let date = today;
  let slotTime = "";

  for (let i = 0; i < numSlots; i++) {
    slotTime = slotOptions.startTime + i;
    if (slotTime < 12) slotTime = slotTime + " AM";
    else if (slotTime == 12) slotTime = slotTime + " PM";
    else {
      slotTime = (slotTime % 12) + " PM";
    }

    times.push((<Box className="SlotTimes">{slotTime}</Box>))
    timesDash.push((<Box className="SlotTimesDash"></Box>))
    
    for (let j = 0; j < 7; j++) {
      if (slotOptions.daysActive[j]) {
        date.setDate(today.getDate() - today.getDay() + j);

        let slotContentIndex = j * numSlots + i;

        slots.push(
          EventSlot({
            id: i + "-" + j,
            day: date,
            numDays: numDays,
            numSlots: numSlots,
            content: slotContents[slotContentIndex] + "" + slotContentIndex
          })
        );
      }
    }
  }
}

// Fill out Calendar with events from currently displayed week (WIP)
function fillEvents(events, numSlots) {
  events.forEach((event) => {
    let e = event.id.split('-');
    let eventDate = new Date(e[1]);
    console.log(eventDate);

    if (true) { //checkIfEventIsWithinWeek(today, eventDate, slotOptions.daysActive)) {
      let eventSlotHour = eventDate.getHours() + 1;
      console.log(eventDate.toTimeString());

      let slotContentIndex = eventDate.getDay() * numSlots + eventSlotHour;
    }
  });
}

function checkIfEventIsWithinWeek(today, eventDate, daysActive) {
  let isCurWeek = false;

  for (let i = today.getDay(); i < 7; i++) {
    if (daysActive[i]) isCurWeek = true;
  }  

  if (!isCurWeek) {
    //today.setDate(today.getDate + 7 - today.getDay());
  }

  let firstDay = today;
  firstDay.setDate(today.getDate() - today.getDay())
  //console.log("First day: " + firstDay.getTime());

  let lastDay = today;
  lastDay.setDate(today.getDate() + 6 - today.getDay());
  //console.log("Last day: " + lastDay.getTime());

  console.log("this equals " + (eventDate.getTime() > firstDay.getTime() && eventDate.getTime() < lastDay.getTime()) + ": " + eventDate.getTime() + " > " + firstDay.getTime() + " && " + eventDate.getTime() + " < " + lastDay.getTime());
  return (eventDate.getTime() > firstDay.getTime()) && (eventDate.getTime() < lastDay.getTime());
}