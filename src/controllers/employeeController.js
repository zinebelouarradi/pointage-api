const { differenceInHours, parse } = require("date-fns");
const {
  handleServerError,
  handleNotFoundError,
  handleConflictError,
} = require("../errorHandler");
const {
  findById,
  findByQuery,
  updateEmployeeById,
  updateEmployeeByI,
  createEmployeeInDb
} = require("../services/EmployeeService");
const { getDateFilterQuery } = require("../utils/queries");
// Créer un nouvel employé
exports.createEmployee = async (req, res) => {
  try {
    const existingEmployee = await findById(req.body.id);
    if (existingEmployee) {
      return handleConflictError(res, "Un employé avec le même ID existe déjà");
    }
    const employee = await createEmployeeInDb(req.body);
    res.status(201).json(employee);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Récupérer tous les employés
exports.getAllEmployees = async (req, res) => {
  try {
    const parsedDate = parse(req.query.creationDate, "yyyy-MM-dd", new Date());

    const query = req.query.creationDate ? getDateFilterQuery(parsedDate) : {};

    const employees = await findByQuery(query);
    res.json({ results: employees, count: employees.length });
  } catch (error) {
    handleServerError(res, error);
  }
};

// Enregistrer le check-in d'un employé
exports.checkIn = async (req, res) => {
  try {
    const { employeeId, comment } = req.body;

    const existingEmployee = await findById(employeeId);
    if (!existingEmployee) {
      return handleNotFoundError(res, "Employé introuvable");
    }

    const employee = await updateEmployeeById(employeeId, {
      checkIn: new Date(),
      comment,
    });
    res.status(200).json(employee);
  } catch (error) {
    handleServerError(res, error);
  }
};

// Enregistrer le check out d'un employé
exports.checkOut = async (req, res) => {
  try {
    const { employeeId, comment } = req.body;

    const existingEmployee = await findById(employeeId);

    if (!existingEmployee) {
      return handleNotFoundError(res, "Employé introuvable");
    }

    let workedHours = 0;
    if (existingEmployee.checkIn) {
      workedHours = differenceInHours(
        new Date(),
        new Date(existingEmployee.checkIn),
      );
    }

    const employee = await updateEmployeeById(employeeId, {
      checkOut: new Date(),
      comment,
      workedHours,
    });
    res.status(200).json(employee);
  } catch (error) {
    handleServerError(res, error);
  }
};
