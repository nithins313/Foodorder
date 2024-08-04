import jwt from "jsonwebtoken";
import pool from "./../db.js";

const Validate = async (js) => {
  if (js.username && js.username.length > 0) {
    const regexusr = /^[A-Za-z0-9@#_+\.\-]{4,9}$/;
    return regexusr.test(js.username);
  }
  return false;
};

const history = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Invalid request body");
    if (await Validate(req.body)) {
      const username = req.body.username;
      const [userResults] = await pool.query(
        "SELECT usrname, phoneno, email, address, uid FROM user WHERE usrname = ?",
        [username]
      );

      if (userResults.length > 0) {
        const user = userResults[0];
        const userId = user.uid;
        const [orderResults] = await pool.query(
          "SELECT * FROM orders WHERE uid = ?",
          [userId]
        );

        if (orderResults.length > 0) {
          const allOrderItems = [];
          for (const order of orderResults) {
            const orderId = order.orderid;
const [orderItemResults] = await pool.query(
              "SELECT * FROM orderitems WHERE orderid = ?",
              [orderId]
            );
            allOrderItems.push({
              orderId,
              items: orderItemResults,
            });
          }

          res.status(200).json({
            user: {
              username: user.usrname,
              phoneNo: user.phoneno,
              email: user.email,
              address: user.address,
            },
            orders: allOrderItems,
          });
        } else {
          res.status(400).send("No order history found");
        }
      } else {
        res.status(400).send("Invalid username");
      }
    } else {
      res.status(400).send("Invalid username format");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export default history;
