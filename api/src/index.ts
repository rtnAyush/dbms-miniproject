import express from "express";
import cors from "cors";

import attendenceRoutes from "./routes/attendence.route";
import menuRoutes from "./routes/messMenu.route";
import userRoutes from "./routes/user.route";


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/attendence", attendenceRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/users", userRoutes);


app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
