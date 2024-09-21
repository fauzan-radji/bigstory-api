import { config } from "dotenv";
import express from "express";
import router from "./v1/router.js";

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World!" }));
app.use("/v1", router);

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;
