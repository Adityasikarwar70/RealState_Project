import  Express  from "express";
import { createListing, deleteListing, getListing, updateListing, getListingSearch, } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router = Express.Router();

router.post('/create',verifyToken ,createListing)
router.delete('/delete/:id',verifyToken ,deleteListing)
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',getListing)
router.get('/get/',getListingSearch)

export default router;