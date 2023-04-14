
export function checkIfEventIsWithinWeek(today, eventDate, daysActive) {
  let isCurWeek = false;
  let tempToday = new Date(today);

  for (let i = today.getDay(); i < 7; i++) {
    if (daysActive[i]) isCurWeek = true;
  }  

  if (!isCurWeek) {
    tempToday.setDate(tempToday.getDate + 7 - tempToday.getDay());
  }

  let firstDay = new Date(tempToday);
  firstDay.setDate(tempToday.getDate() - tempToday.getDay());

  let lastDay = new Date(tempToday);
  lastDay.setDate(tempToday.getDate() + 6 - tempToday.getDay());

  //console.log("this equals " + (eventDate.getTime() > firstDay.getTime() && eventDate.getTime() < lastDay.getTime()) +
  //  ": " + eventDate.getTime() + " > " + firstDay.getTime() + " && " + eventDate.getTime() + " < " + lastDay.getTime());
  return (eventDate.getTime() > firstDay.getTime()) && (eventDate.getTime() < lastDay.getTime());
}

export function convertTimeToReadable(timeToConvert, addSuffix) {
  let slotSuffix = " PM";

  if (Math.floor(timeToConvert) < 12)
    slotSuffix = " AM";
  else if (Math.floor(timeToConvert) !== 12)
    timeToConvert = (timeToConvert % 12);

  if (timeToConvert % 1 !== 0)
    timeToConvert = Math.floor(timeToConvert) + ":" + (timeToConvert % 1 * 60);

  return addSuffix ? timeToConvert + slotSuffix : timeToConvert;
}