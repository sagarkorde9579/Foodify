import express from "express"
import { removeFromCart,addToCart,getCart } from "../controllers/cartController.js"
import { get } from "mongoose";
import authMiddleware from "../middleware/auth.js";
const companyRoutes=express.Router();

companyRoutes.post("/add",authMiddleware,addToCart)

companyRoutes.post("/get",authMiddleware,getCart)

export default cartRouter;