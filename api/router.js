const router = require("express").Router();
const stories = require("./handler/stories");

router.get("/stories", stories.index);
router.get("/stories/:id", stories.show);
router.post("/stories", stories.create);

module.exports = router;
