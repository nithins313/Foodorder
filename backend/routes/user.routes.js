import express from "express";
import login from "../controllers/login.contol.js";
const routes = express.Router();

routes.get("/login", login);
export default routes;
