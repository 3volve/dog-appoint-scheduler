export default class Event {
  customer;
  dogs;
  // Need to add subsections for dog details:
  // Dog name:
  // Dog Age:
  // Dog Breed:
  phone;
  email;
  payment = false;
  startTime;
  summary;

  constructor(startTime, dogs) {
    this.startTime = startTime;
    this.dogs = dogs;
  }

  getCopy() {
    let newEvent = new Event(this.startTime, this.dogs);
    newEvent.customer = this.customer;
    newEvent.email = this.email;
    newEvent.payment = this.payment;
    newEvent.summary = this.summary;

    return newEvent;
  }
}