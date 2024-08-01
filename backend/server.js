import express from "express";
import cors from "cors";
import { connect } from "./db.js";
import user from "./routes/user.routes.js";
const app = express();
const port = 5500;
//app.use(cors);
app.use("/user", user);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
await connect();
