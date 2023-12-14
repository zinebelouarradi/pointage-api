const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pointage API',
      version: '1.0.0',
      description: 'API pour la gestion des employés de l\'école ABC',
    },
  },
  apis: ['./docs/*.js'],
};

module.exports = options;
