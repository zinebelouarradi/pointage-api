const {body, query, validationResult} = require('express-validator');
const {isValid, parseISO, parse} = require('date-fns');
const {fr} = require('date-fns/locale');

const allowedDateFormat = 'yyyy-MM-dd';

const validateCreateEmployee = [
  body('name').isString().notEmpty().withMessage('le champs name est requis'),
  body('firstName').isString().notEmpty().withMessage('le champs firstName est requis'),
  body('department').isString().notEmpty().withMessage('le champs department est requis'),
  body('id').isString().notEmpty().withMessage("le champs Id est requis"),
  body('creationDate').optional().custom((value) => {
    const parsedDate = parse(value, allowedDateFormat, new Date(), {locale: fr});

    if (!isValid(parsedDate)) {
      throw new Error(`Date invalide. format autorisé ${allowedDateFormat}.`);
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
];

const validateCheckInAndOut = [
  body('employeeId').isString().notEmpty().withMessage("le champs employeeId est requis"),
  body('comment').isString().optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
];


const validateCreationDate = [
  query('creationDate').optional()
    .custom((value) => {
      const parsedDate = parse(value, allowedDateFormat, new Date(), {locale: fr});

      if (!isValid(parsedDate)) {
        throw new Error(`Date invalide. format autorisé ${allowedDateFormat}.`);
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    next();
  },
];

module.exports = {
  validateCreateEmployee,
  validateCheckInAndOut,
  validateCreationDate
};
