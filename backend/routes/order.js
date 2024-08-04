import express from "express";
import history from "../controllers/orders.history.js";
import insertOrder from "../controllers/order.item.js";
const routes = express.Router();
routes.post("/history", history);
routes.post("/place", insertOrder);
export default routes;
