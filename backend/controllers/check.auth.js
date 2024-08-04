import jwt from "jsonwebtoken";

const checkAuth = (req, res) => {
  const token = req.cookies.cookie;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "hi", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Authenticated" });
  });
};

export default checkAuth;
