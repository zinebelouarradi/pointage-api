const Employee = require("../models/employee/employeeModel");

async function findById(id) {
  console.log('+++++++++++++')
  return Employee.findOne({id});
}

async function createEmployee(employeeData) {

  const creationDate = employeeData.creationDate || new Date()

  const employee = new Employee({
    ...employeeData, creationDate,
  });
  await employee.save();
  return employee;
}

async function findByQuery(query) {
  return Employee.find(query);
}

async function updateEmployeeById(employeeId, updatedFields) {
  const employee = await Employee.findOne({id: employeeId});
  Object.assign(employee, updatedFields);

  await employee.save();
  return employee;
}

module.exports = {
  findById,
  createEmployee,
  findByQuery,
  updateEmployeeById,
};
