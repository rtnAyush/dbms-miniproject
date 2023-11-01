import express from "express";
import cors from "cors";
import routes from "./routes/attendence.route";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// import routes from "./routes";
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
