require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const server = express();

require("./database");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.listen(process.env.PORT || 3333);
