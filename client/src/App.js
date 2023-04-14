import React, { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CssBaseline } from '@mui/material';
import "./App.css";
import View from "./Components/View.js";
 
export default function App() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState();

  const getEvents = () => {
    setLoading(true);

    fetch("/api/get-events")
    .then((res) => res.json())
    .then((data) => {
      setEvents(JSON.parse(data));
      setLoading(false);
    });
  }

  const addEvent = () => {
    setLoading(true);
    
    fetch("/api/add-event")
    .then((res) => res.json())
    .then((data) => {
      setEvents(JSON.parse(data));
      setLoading(false);
    });
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <View events={ events } addEvent={ addEvent } />
      </LocalizationProvider>
    </div>
  );
}