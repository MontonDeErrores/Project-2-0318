const isInEvent = (eventId,user) => {
  if(user) {
    let events = user.events;  
    return events.filter(event => event.toString() === eventId).length > 0 
  }
  else{
      console.log("This user is not invited to the event ");
      return false;
  }
}

module.exports = isInEvent;