import express from "express";
import login from "../controllers/login.contol.js";
import signup from "../controllers/signup.control.js";
const routes = express.Router();
routes.post("/login", login);
routes.post("/signup", signup);
export default routes;
