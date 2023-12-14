const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connectDB');
const employeeRoutes = require('./routes/employeeRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../swaggerOptions');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/employee', employeeRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING!!');
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });

module.exports = app;
