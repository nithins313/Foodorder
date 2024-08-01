import pool from "./../db.js";
const login = async (res, rep) => {
  try {
    rep.send(await pool.query("select * from user"));
  } catch (err) {
    console.log(err);
  }
};
export default login;
