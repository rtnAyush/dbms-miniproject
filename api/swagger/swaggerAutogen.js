const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const outputFile = './swagger_output.json';
const endpointsFiles = ['../server.js'];
const doc = {
    info: {
        title: 'Your API',
        description: 'Description of your API',
        version: '1.0.0',
    },
    host: "localhost:" + process.env.PORT,
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
