import React from "react";
import "../App.css";
 
function Event({ description, startTime }) {
  // let date = new Date(startTime);
  // console.log(date.getMonth());

  return (
    <div className="">
      <span className="" href="">
        <div className="">
          <p className="">{description}</p>
          <p className="">{startTime}</p>
        </div>
      </span>
    </div>
  );
}
 
export default Event;