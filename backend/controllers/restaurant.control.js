import pool from "./../db.js";
const restaurant = async (res, rep) => {
  const [results] = await pool.query(
    "select rid as restaurantid,resname as restaurantname from restaurant"
  );
  if (results.length > 0) {
    rep.status(200).json(results);
  } else {
    rep.status(400).send("No restaurant");
  }
};
export default restaurant;
