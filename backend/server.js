import express from "express";
import cors from "cors";
import { connect } from "./db.js";
import restaurant from "./routes/restaurant.routes.js";
import user from "./routes/user.routes.js";
import order from "./routes/order.js";
const app = express();
const port = 5500;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", user);
app.use("/order", order);
app.use("/restaurant", restaurant);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
await connect();
