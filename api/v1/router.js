import { Router } from "express";
import { index, show, create } from "./handler/stories.js";

const router = Router();

router.get("/stories", index);
router.get("/stories/:id", show);
router.post("/stories", create);

export default router;
