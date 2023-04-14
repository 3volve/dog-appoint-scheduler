import React, { memo } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import { set } from 'date-fns';

export function DayHeaderSlot({id, isToday, numDays, content}) {
  return (
    <Grid key={id} className="Slot DayHeader" xs={12/numDays} disableEqualOverflow>
      <div className="DayHeaderDivider" />
      <div className={isToday ? "Slot-FullWidth DayHeader-Today" : "Slot-FullWidth"}>
        <Typography className="SlotText" variant="h6">{content}</Typography>
      </div>
    </Grid>
  );
}

export function EventSlot({ id, numDays, numSlots, disabled, content }) {
  let slotNum = id.split('-')[0];
  let borderStyle = parseInt(slotNum) === (numSlots - 1) ?
    "none none none none" : "none none solid none";

  return (
    <Grid key={id} className="Slot EventSlot" xs={12/numDays} style={{borderStyle: borderStyle}} disableEqualOverflow>
      <div className="EventSlotDivider" />
      <div className={disabled ? "EventSlot-Disabled" : ""}id={id} style={{width: "100%"}}>
        {content}
      </div>
    </Grid>
  );
}

export function EmptySlot({ date, disabled, openEventDialogue }) {
  return (
    <Button className="EmptyEvent" onClick={() => openEventDialogue(date)} disabled={disabled} />
  );
}

export const MemoizedEmptySlot = memo(EmptySlot);

export function FilledSlot({ slotOptions, event }) {
  let eventTime = new Date(event.startDate);
  let firstSuffix = "pm";
  let secondSuffix = "pm";
  
  let eventStartTime = eventTime.getHours();
  if (eventStartTime < 12) firstSuffix = "am";
  else if (eventStartTime !== 12) eventStartTime = eventStartTime - 12;
  if (eventTime.getMinutes() !== 0) eventStartTime = eventStartTime + ":" + eventTime.getMinutes();

  eventTime.setMinutes(eventTime.getMinutes() + slotOptions.duration);
  // console.log(eventTime.getHours());
  let eventEndTime = eventTime.getHours();
  if (eventEndTime < 12) secondSuffix = "am";
  else if (eventEndTime !== 12) eventEndTime = eventEndTime - 12;
  if (eventTime.getMinutes() !== 0) eventEndTime = eventEndTime + ":" + eventTime.getMinutes();
  
  if (firstSuffix === secondSuffix) firstSuffix = "";

  return (
    <Box className="FilledEvent">
      <Typography variant="h6">
        {event.summary}
      </Typography>
      <Typography variant="h6">
        {eventStartTime + firstSuffix + " - " + eventEndTime + secondSuffix }
      </Typography>
    </Box>
  );
}
