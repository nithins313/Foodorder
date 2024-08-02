import express from "express";
import foods from "../controllers/foods.control.js";
import restaurant from "../controllers/restaurant.control.js";
const routes = express.Router();
routes.get("/restaurant", restaurant);
routes.get("/foods", foods);
export default routes;
