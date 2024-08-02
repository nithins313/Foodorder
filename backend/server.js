import express from "express";
import cors from "cors";
import { connect } from "./db.js";
import restaurant from "./routes/restaurant.routes.js";
import user from "./routes/user.routes.js";
const app = express();
const port = 5500;
app.use(express.json());
app.use("/user", user);
app.use("/restaurant", restaurant);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
await connect();
