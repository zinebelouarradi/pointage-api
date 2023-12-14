const {startOfDay, endOfDay} = require("date-fns");
exports.getDateFilterQuery = (date) => {

  return {
    creationDate: {
      $gte: startOfDay(new Date(date)),
      $lt: endOfDay(new Date(date)),
    }
  }
}
