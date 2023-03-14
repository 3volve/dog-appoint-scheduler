import React from "react";
import Event from "./Event.js";
import Calendar from "./Calendar.js"
import "../App.css";
 
function View({ events }) {
  return (
    <div className="App">
      <h1 className="">
        {
          !events ? "React App currently loading events..." :
          events.length === 0 ? "React App loaded empty Google Calendar" :
          (
            <div>
              React App for Dog Training Appointment Scheduling
              <Calendar events={events} />
            </div>
          )
        }
      </h1>
    </div>
  );
}
 
export default View;