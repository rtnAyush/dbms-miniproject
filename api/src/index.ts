import express from "express";
import cors from "cors";

import attendenceRoutes from "./routes/attendence.route";
import menuRoutes from "./routes/messMenu.route";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/attendence", attendenceRoutes);
app.use("/api/menu", menuRoutes);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
