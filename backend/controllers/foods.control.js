import pool from "./../db.js";
const foods = async (res, rep) => {
  const [results] = await pool.query("select * from restaurant ");
  rep.status(200).json(results);
};
export default foods;
