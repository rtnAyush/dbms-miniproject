import express from "express";

const app = express();

import cors from "cors";

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

