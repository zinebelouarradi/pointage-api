const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./connectDB");
const employeeRoutes = require("./routes/employeeRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swaggerConfig");

const PORT = process.env.PORT

const app = express();
app.use(bodyParser.json());

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app
  //Docs
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  //Routes
  .use("/employee", employeeRoutes)
  //Default Route
  .get("/", (req, res) => {
    res.send("APP IS RUNNING !!, ");
  })
  //Handle not found
  .use((req, res) => {
    res.status(404).send(`
      <h1>Not Found</h1>
      <p>The requested page does not exist.</p>
      <button onclick="redirect()">Go to Docs</button>
      <script>
        function redirect() {
          window.location.href = '/api-docs'
        }
      </script>
    `);
  });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}. Visit on http://localhost:8080/api-docs/`);
    });
  })

module.exports = app;
