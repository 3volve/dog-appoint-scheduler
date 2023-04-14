import { useState, useCallback, useEffect } from "react";
import Calendar from "Components/Calendar.js"
import EventDialogue from 'Components/EventDialogue.js';
import "App.css";
 
function View({ events, addEvent }) {
  const [message, setMessage] = useState("React App currently loading events...");
  const [cal, setCal] = useState(<div />);
  const [dialogueTarget, setTarget] = useState("");
  const [open, setOpen] = useState(false);

  const openEventDialogue = useCallback((slotDate) => {
    setTarget(slotDate);
    setOpen(true);
  }, [events]);

  useEffect(() => {
    if (events) {
      if (events.length === 0)
        setMessage("React App loaded empty Google Calendar");
      else {
        setMessage("React App for Dog Training Appointment Scheduling");
        setCal(<Calendar events={events} openEventDialogue={openEventDialogue} />);
      }
    }
  }, [events]);

  return (
    <div className="App">
      <h1 className="">{ message }</h1>
      {cal}
      <EventDialogue open={open} setOpen={setOpen} target={dialogueTarget} addEvent={addEvent} />
    </div>
  );
}

export default View;