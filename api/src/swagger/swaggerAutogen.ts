const swaggerAutogen = require("swagger-autogen")();
// import swaggerAutogen from "swagger-autogen";
require("dotenv").config();

const outputFile = "./swagger_output.json";
const routes = ["../index.ts"];
const doc = {
	info: {
		title: "Your API",
		description: "Description of your API",
		version: "1.0.0",
	},
	host: process.env.SWAGGER_URL + ":" + process.env.PORT,
	basePath: "/",
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["application/json"],
};

swaggerAutogen(outputFile, routes, doc);
