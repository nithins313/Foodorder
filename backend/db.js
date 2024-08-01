import { createPool } from "mysql2/promise";
//import awsCaBundle from "aws-ssl-profiles";
//const awsCaBundle = awsCaBundle();
const pool = createPool({
  host: "food-order-hackathon.cp8m0ma281su.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "foodorder",
  port: "3306",
  database: "foodorderdb",
  waitForConnections: true,
  connectionLimit: 10,
});
const connect = async () => {
  try {
    await pool.getConnection();
    console.log("success");
  } catch (err) {
    console.log("eroor", err);
  }
};
export { connect };
export default pool;
