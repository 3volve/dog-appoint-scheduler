# dog-appoint-scheduler
A simple application exploring using Google calendar API integration for a site to schedule dog appointments.

## Backstory
My wife is a dog trainer of many years and has worked at 5 different locations that all had one thing in common: A terrible dog training appointment scheduling system. I've thought about this gap for a while and what a solution designed by myself would look like.  I eventually landed at the idea of "why recreate the wheel", and settled on seeing if I could just provide a process for integrating a google calendar API solution.

## Basic Summary
The theory is a client can grab available slots from the server which directly connects to the specific google calendar of the user (Not the user's primary calendar, but rather a custom created one that specifically is just used for appointments.)
<br>
This client can then display these available slots to the customers, who can select and book one of the slots. This process will inform the server to create a new event in the user's calendar which will therefore show up on their own google calendar automatically and therefore prevent double booking (assuming I code the tentative allocation of slots correctly, since I don't think I can use a transactional database smoothly without essentially duplicating work that the google cal is supposed to be doing for me.  Although I might need to implement a middle-man transactional database that the server runs and only updates the google cal when bookings officially go through.)
<br>
I made this in React/Node.js because while I've got experience building web apps in Angular, I wanted to extend that experience to working in React as well. This project can demonstrate the experience in React and developing and the desire to learn new technologies.


## Potential Addition Ideas
- Either use a separate google calendar, where the user can create events that are used to signify available time frame, or have a set of options you can edit in the settings page.
- Maybe extend to allow multiple different google calendars to attach to the server, and the client can swap between them.
