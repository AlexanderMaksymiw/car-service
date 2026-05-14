import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/users.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("is it working?");
});

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});
