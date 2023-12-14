const {getDateFilterQuery} = require("../models/dbQueries");
const {differenceInHours, parse} = require("date-fns");
const {createEmployeeInDb, findByQuery, findById, updateEmployeeById} = require("../services/EmployeeService");

// Créer un nouvel employé
exports.createEmployee = async (req, res) => {
  try {
    const existingEmployee = await findById(req.body.id);
    console.log({existingEmployee}, 'dklnslkdnsakldnaklnkldankladnkln')
    if (existingEmployee) {
      return res.status(409).json({error: "Un employé avec le même ID existe déjà"});
    }
    const employee = await createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({error: "Internal server error", details: error.message});
  }
};

// Récupérer tous les employés
exports.getAllEmployees = async (req, res) => {
  try {
    const parsedDate = parse(req.query.creationDate, 'yyyy-MM-dd', new Date());

    const query = req.query.creationDate ? getDateFilterQuery(parsedDate) : {};

    const employees = await findByQuery(query);
    res.json({results: employees, count: employees.length});
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({error: "Internal server error", details: error.message});
  }
};

// Enregistrer le check-in d'un employé
exports.checkIn = async (req, res) => {
  try {
    const {employeeId, comment} = req.body;

    const existingEmployee = await findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({error: "Employé introuvable"});
    }

    const employee = await updateEmployeeById(employeeId, {checkIn: new Date(), comment});
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error", details: error.message});
  }
};

// Enregistrer le check out d'un employé
exports.checkOut = async (req, res) => {
  try {
    const {employeeId, comment} = req.body;

    const existingEmployee = await findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({error: "Employé introuvable"});
    }

    let workedHours = 0;
    if (existingEmployee.checkIn) {
      workedHours = differenceInHours(new Date(), new Date(existingEmployee.checkIn));
    }

    const employee = await updateEmployeeById(employeeId, {checkOut: new Date(), comment, workedHours});
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({error: "Internal server error", details: error.message});
  }
};
