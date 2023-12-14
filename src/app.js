const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const employeeRoutes = require('./routes/employeeRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

const PORT = process.env.PORT || 8080;

async function startServer() {
  const app = express();
  app.use(bodyParser.json());

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/employee', employeeRoutes);

  app.get('/', (req, res) => {
    res.send('APP IS RUNNING!!');
  });

  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  return app;
}

startServer().catch((error) => {
  console.error('Error starting the server:', error.message);
  process.exit(1);
});

module.exports = startServer;
