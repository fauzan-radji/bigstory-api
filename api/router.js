const router = require("express").Router();
const { create, read } = require("./handler/stories");

router.get("/stories", read);
router.post("/stories", create);

module.exports = router;
