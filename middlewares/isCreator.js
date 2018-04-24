const Events = require("../models/Event");

const isCreator = (eventId, userId) => {
  let creator = false;
  return Events.findById(eventId)
    .then((event)=>{
      if (event.admin.toString() === userId){
        creator = true;
      }
      else {
        creator = false;
      }
      return creator;
    })
    .catch((err)=>{
      console.log(err)
    })
}

module.exports = isCreator;