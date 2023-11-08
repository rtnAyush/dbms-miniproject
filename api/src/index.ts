import express from "express";
import cors from "cors";

import attendenceRoutes from "./routes/attendence.route";
import menuRoutes from "./routes/messMenu.route";
import userRoutes from "./routes/user.route";
import complainRoutes from "./routes/complains.route";
import swaggerUi from "swagger-ui-express";
const swaggerSpec = require("../public/swagger_output.json");

const app = express();
const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	"/api/attendence",
	attendenceRoutes
	/* 
        #swagger.tags = ['Attendence Routes']
    */
);
app.use(
	"/api/menu",
	menuRoutes
	/* 
        #swagger.tags = ['Menu Routes']
    */
);
app.use(
	"/api/users",
	userRoutes
	/* 
        #swagger.tags = ['User Routes']
    */
);
app.use(
	"/api/complains",
	complainRoutes
	/* 
        #swagger.tags = ['Complains Routes']
    */
);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
