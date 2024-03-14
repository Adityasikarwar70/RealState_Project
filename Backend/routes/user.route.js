import  Express  from "express";
import { test } from "../controllers/user.controllers.js";


const router = Express.Router();

router.get('/test',test)
export default router;