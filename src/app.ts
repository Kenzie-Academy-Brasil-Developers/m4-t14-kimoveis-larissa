import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import { categoryRouter } from "./routes/categories.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoryRouter);

app.use(handleErrors);
export default app;
