require("./config.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var routes = require("./src/routes/todo");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;
routes(app);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
