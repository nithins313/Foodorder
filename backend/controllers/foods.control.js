import pool from "./../db.js";
const foods = async (res, rep) => {
  try {
    const rid = res.query.rid;
    if (rid) {
      const [restaurantResults] = await pool.query(
        "SELECT rid AS restaurantId, resname as name, phoneno, address FROM restaurant WHERE rid = ?",
        [rid]
      );
      const [foodResults] = await pool.query(
        "SELECT rid AS restaurantId, fid AS foodid, name AS foodname, price, description, img AS imgpath FROM fooditems WHERE rid = ?",
        [rid]
      );

      if (restaurantResults.length >= 0) {
        const restaurant = restaurantResults[0];
        const response = {
          restaurant,
          foodItems: foodResults,
        };
        rep.status(200).json(response);
      } else {
        rep.status(404).send("Restaurant not found");
      }
    } else {
      rep.status(400).send("Restaurant ID is required");
    }
  } catch (err) {
    console.log(err);
    rep.status(500).send("Server error");
  }
};
export default foods;
