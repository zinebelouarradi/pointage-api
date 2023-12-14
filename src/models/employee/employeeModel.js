const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  creationDate: {type: Date, default: new Date()},
  department: {
    type: String,
    required: true,
  },
  workedHours: {type: Number},
  checkIn: {type: Date},
  checkOut: {type: Date},
  comment: {type: String}
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
