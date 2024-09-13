require("dotenv").config();
const express = require("express");
const router = require("./api/router");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ message: "Hello World!" }));
app.use("/v1", router);

app.listen(port, () => console.log(`Server ready on port ${port}.`));
