import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/route";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

dotenv.config();

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Nazare API",
      version: "1.0.0",
    },
  },
  apis: ["./src/index.ts", "./src/routes/route.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//allowing JSON
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/api/nazare", router);

/**
 * @swagger
 * /:
 *   get:
 *     description:  Check your connection with the server.
 *     responses:
 *        200:
 *          description: Success
 */
app.get("/", (req: Request, res: Response) => {
  res.redirect("/docs");
});

app.listen(process.env.PORT, (): void => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
