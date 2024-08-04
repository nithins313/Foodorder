import jwt from "jsonwebtoken";
import pool from "./../db.js";
const Validate = async (js) => {
  if (js.username.length !== 0) {
    if (js.password.length !== 0) {
      const regexusr = /^[A-Za-z0-9@#_+\.\-]{4,9}$/;
      const regexpass =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
      if (regexusr.test(js.username)) {
        if (regexpass.test(js.password)) {
          return true;
        }
      }
    }
  }
  return false;
};
const login = async (res, rep) => {
  try {
    if (!res.body) rep.status(400).send("invaild username or password");

    if (await Validate(res.body)) {
      const username = res.body.username;
      const password = res.body.password;
      const [results] = await pool.query(
        "select * from user where usrname = ? ",
        [username]
      );
      if (results.length > 0) {
        if (results[0].password === password) {
          const token = jwt.sign(
            {
              username: { username },
              password: { password },
            },
            "hi",
            { expiresIn: "1d" }
          );
          rep
            .cookie("cookie", token, {
              httpOnly: true,
              secure: true,
              sameSite: "Lax",
              maxAge: 24 * 60 * 60 * 1000,
              path: "/",
            })
            .status(200)
            .json({
              cookie: token,
              message: "Access granted",
            });
        } else {
          rep.status(400).send("invaild username or password");
        }
      } else {
        rep.status(400).send("invaild username or password");
      }
    } else {
      {
        rep.status(400).send("invaild username or password");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export default login;
