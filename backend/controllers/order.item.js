import pool from "../db.js";

const insertOrder = async (req, res) => {
  try {
    const { usrname, items } = req.body;

    if (!usrname || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).send("Missing required fields or invalid items");
    }

    for (const item of items) {
      if (!item.foodid || !item.resid || !item.quantity || item.quantity <= 0) {
        return res.status(400).send("Invalid item data");
      }
    }

    const [userResults] = await pool.query(
      "SELECT uid FROM user WHERE usrname = ?",
      [usrname]
    );
    if (userResults.length === 0) {
      return res.status(400).send("Invalid username");
    }
    const uid = userResults[0].uid;
    const [orderResult] = await pool.query(
      "INSERT INTO orders (rid, uid, Date, price) VALUES (?, ?, NOW(), 0)",
      [items[0].resid, uid]
    );
    const orderid = orderResult.insertId;

    let totalOrderPrice = 0;

    const orderItems = [];

    for (const item of items) {
      const [foodResults] = await pool.query(
        "SELECT price FROM fooditems WHERE fid = ?",
        [item.foodid]
      );
      if (foodResults.length === 0) {
        return res.status(400).send(`Invalid food ID: ${item.foodid}`);
      }
      const foodPrice = foodResults[0].price;

      const totalPrice = foodPrice * item.quantity;
      totalOrderPrice += totalPrice;
      orderItems.push([item.foodid, orderid, item.quantity, totalPrice]);
    }

    await pool.query(
      "INSERT INTO orderitems (fid, orderid, quantity, price) VALUES ?",
      [orderItems]
    );

    await pool.query("UPDATE orders SET price = ? WHERE orderid = ?", [
      totalOrderPrice,
      orderid,
    ]);

    res.status(200).send("Order placed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export default insertOrder;
