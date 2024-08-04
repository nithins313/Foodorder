import jwt from "jsonwebtoken";
import pool from "./../db.js";
const Validate = async (js) => {
  if (js.username.length !== 0) {
    if (js.password.length !== 0) {
      const regexusr = /^[A-Za-z0-9@#_+\.\-]{4,9}$/;
      const regexpass =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
      const regexemail = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;
      if (regexusr.test(js.username)) {
        if (regexpass.test(js.password)) {
          if (regexemail.test(js.email)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};
const validusr = async (username) => {
  const [results] = await pool.query("select * from user where usrname = ? ", [
    username,
  ]);
  if (results.length > 0) return true;
  else return false;
};
const signup = async (res, rep) => {
  try {
    if (await Validate(res.body)) {
      
      if (!(await validusr(res.body.username))) {
        const username = res.body.username;
        const password = res.body.password;
        const phoneno = res.body.phoneno;
        const address = res.body.address;
        const email = res.body.email;

        const [results] = await pool.query(
          "insert into user (usrname,password,phoneno,email,address) values(?,?,?,?,?)",
          [username, password, phoneno, email, address]
        );
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
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
          })
          .status(200)
          .json({
            cookie: token,
            message: "Access granted",
          });
      } else {
        rep.status(400).send("Username taken");
      }
    } else {
      rep.status(400).send("invaild username or password");
    }
  } catch (err) {
    console.log(err);
  }
};
export default signup;
