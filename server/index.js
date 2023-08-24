import express from "express";
import dotenv from "dotenv";
import Connections from "./database/db.js";
import router from "./router/routes.js";
import helmet from "helmet";
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 2000;

let app1 = express(); // Compliant
app1.disable("x-powered-by");

let app2 = express(); // Compliant
app2.use(helmet.hidePoweredBy());

app2.use(
  express.urlencoded({
    extended: true,
  })
);
app2.use(express.json({ extended: true }));

app2.use(cors());

app2.use("/", router);
app2.use("/api2", router);

Connections();

app2.listen(PORT, () => {
  console.log(`Server is running at @ http://localhost:${PORT}`);
});
