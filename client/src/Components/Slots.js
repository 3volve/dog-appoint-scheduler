import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'

export function EventSlot({ id, day, numDays, numSlots, content }) {
  let style = "none none none none";
  let inset = false;

  if (isNaN(id[0])) {
    style = "none none solid none";
    inset = true;
  } else {
    if (id[0] != numSlots - 1) style = "none none solid none";
  }

  return (
    <Grid xs={12/numDays} key={id + "-Grid"} style={{display: "flex"}} disableEqualOverflow>
      <div style={{
        height: (inset ? "60%" : "100%"),
        alignSelf: "end",
        borderColor: "lightgrey",
        borderWidth: "1px",
        borderStyle: "none none none solid"
      }} />

      <div className="EventSlot" style={{
        width: "100%",
        borderColor: "lightgrey",
        borderWidth: "1px",
        borderStyle: style
      }}>
        { 
          // I may or may not convert this into just one component that changes its classname instead
          isNaN(id[0]) ?
            (<Typography id={id} className="DayHeaders" variant="h6">{content}</Typography>) :
            (<Typography id={id} className="SlotText" variant="h6">{content}</Typography>)
        }
      </div>
    </Grid>
  );
}