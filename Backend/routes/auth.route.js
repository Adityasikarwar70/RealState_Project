import  Express  from "express";
import { google, logout, signin, signup } from "../controllers/auth.controllers.js";

const router = Express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get("/logout",logout);

export default router;