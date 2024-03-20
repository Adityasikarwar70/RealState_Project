import  Express  from "express";
import { google, signin, signup } from "../controllers/auth.controllers.js";

const router = Express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);

export default router;