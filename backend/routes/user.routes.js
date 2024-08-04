import express from "express";
import login from "../controllers/login.contol.js";
import signup from "../controllers/signup.control.js";
import checkAuth from "../controllers/check.auth.js";
const routes = express.Router();
routes.post("/login", login);
routes.post("/check", checkAuth);
routes.post("/signup", signup);
export default routes;
