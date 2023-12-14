const Employee = require("../models/employee/employeeModel");

class EmployeeService {
  async findById(id) {
    return Employee.findOne({id});
  }

  async createEmployeeInDb(employeeData) {
    const creationDate = employeeData.creationDate || new Date();
    const employee = new Employee({
      ...employeeData,
      creationDate,
    });
    await employee.save();
    return employee;
  }

  async findByQuery(query) {
    return Employee.find(query);
  }

  async updateEmployeeById(employeeId, updatedFields) {
    const employee = await Employee.findOne({id: employeeId});
    Object.assign(employee, updatedFields);
    await employee.save();
    return employee;
  }
}

module.exports = new EmployeeService();
