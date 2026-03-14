import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import  errorMiddleware  from "./middlewares/error.middleware.js";
import  notFound  from "./middlewares/notFound.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorMiddleware);

export default app;