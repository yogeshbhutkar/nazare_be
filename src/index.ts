import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/route";

dotenv.config();

const app = express();

//allowing JSON
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/nazare", router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "API for Nazare." });
});

app.listen(process.env.PORT, (): void => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
