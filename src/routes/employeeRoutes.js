const {Router} = require("express");
const employeeController = require("../controllers/employeeController");
const {
  validateCreateEmployee,
  validateCreationDate,
  validateCheckInAndOut
} = require("../middlewares/employeeValidation");

const router = Router()

require('../../docs/employeeSwaggerDefintions');

router.get("/", validateCreationDate, employeeController.getAllEmployees)
  .post("/", validateCreateEmployee, employeeController.createEmployee)
  .put('/check-in', validateCheckInAndOut, employeeController.checkIn)
  .put('/check-out', validateCheckInAndOut, employeeController.checkOut);

module.exports = router;
