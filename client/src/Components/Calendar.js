import React, { useState } from 'react';
import { Paper, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'

import { convertTimeToReadable, checkIfEventIsWithinWeek } from 'Utils/CalendarUtils.js'
import { DayHeaderSlot, EventSlot, MemoizedEmptySlot, FilledSlot } from './Slots.js';

export default function Calendar({ events, openEventDialogue }) {
  const times = [];
  const timesDash = [<Box className="SlotTimesDivider"/>]
  const slots = [];
  const days = [];

  // To be replaced or substituted by a given set of options
  const slotOptions = {
    duration: 60,
    restBefore: 0,
    restAfter: 0,
    startTime: 8,
    endTime: 17,
    gapTimes: [(12, 13)],
    daysActive: [0, 1, 1, 1, 1, 1, 0]
  } // Note: I might want to alter the times to be Date Objects so that they can be adjusted for localization if needed.


  let numDays = slotOptions.daysActive.reduce((accumulator, currentVal) => accumulator + currentVal);
  let numSlots = (slotOptions.endTime - slotOptions.startTime) / (slotOptions.duration / 60); // Need to subtract by gap times for numSlots
  const [slotContents] = useState(Array(7 * numSlots).fill(""));

  initDayHeaders(slotOptions, days, numDays, numSlots);
  initSlots(slotOptions, slots, slotContents, times, timesDash, numDays, numSlots, openEventDialogue);
  updateEvents(slotOptions, events, numSlots, slotContents);

  return (
    <Paper id="calendar" className="MainCalendar">
      <Box id="times" className="LeftSide">{times}</Box>
      <Box id="timeSlots" className="LeftSide">{timesDash}</Box>

      <Box className="RightSide">
        <Grid container className="Grid" spacing={0}>{days}</Grid>
        <Grid container className="Grid" spacing={0}>{slots}</Grid>
      </Box>
    </Paper>
  );
}

// Instantiate the day headers
function initDayHeaders(slotOptions, days, numDays, numSlots) {
  let today = new Date();
  let date = new Date();
  
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
        default: content = "Woops!"
      }

      content += " | " + date.getDate();

      days.push(
        DayHeaderSlot({
          id: content,
          isToday: today.getDate() === date.getDate(),
          numDays: numDays,
          numSlots: numSlots,
          content: content
        })
      );
    }
  });
}

// Instantiate the Slots & Slot Times
function initSlots(slotOptions, slots, slotContents, times, timesDash, numDays, numSlots, openEventDialogue) {
  let today = new Date();
  let date = new Date();
  let slotTime = "";

  // I might want to adjust how I assign ids to the slots, and instead just add the exact date each slot represents to the component someway.
  for (let i = 0; i < numSlots; i++) {
    slotTime = slotOptions.startTime + i * (slotOptions.duration / 60);
    const readableTime = convertTimeToReadable(slotTime, true);

    // Real quickly just fill the time components in along with the slots...
    times.push((<Box id={readableTime} className="SlotTimes">{readableTime}</Box>))
    timesDash.push((<Box className="SlotTimesDivider"></Box>))
    
    for (let j = 0; j < 7; j++) {
      if (slotOptions.daysActive[j]) {
        date.setDate(today.getDate() - today.getDay() + j);
        date.setHours(Math.floor(slotTime));
        date.setMinutes(slotTime % 1 * 60);
        date.setSeconds(0);
        date.setMilliseconds(0);

        let slotContentIndex = j * numSlots + i;

        let disabled = date <= today;

        if (!slotContents[slotContentIndex])
          slotContents[slotContentIndex] = (<MemoizedEmptySlot date={date.toISOString()} disabled={disabled} openEventDialogue={openEventDialogue}/>);

        slots.push(
          EventSlot({
            id: (i + "-" + j),
            day: date,
            numDays: numDays,
            numSlots: numSlots,
            disabled: disabled,
            content: slotContents[slotContentIndex] ? slotContents[slotContentIndex] : ""
          })
        );
      }
    }
  }
}

// Fill out Calendar with events from currently displayed week (WIP)
function updateEvents(slotOptions, events, numSlots, slotContents) {
  events.forEach((event) => {
    let eventDate = new Date(event.startDate);

    if (checkIfEventIsWithinWeek(new Date(), eventDate, slotOptions.daysActive)) {
      let slotContentIndex = eventDate.getDay() * numSlots + eventDate.getHours() - slotOptions.startTime;
      slotContents[slotContentIndex] = FilledSlot({slotOptions: slotOptions, event: event});
    }
  });
}