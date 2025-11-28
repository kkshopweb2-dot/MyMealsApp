import jwt from "jsonwebtoken";

const JWT_SECRET = "jklmn";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token)
    return res.status(403).json({ auth: false, message: "No token provided." });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ auth: false, message: "Token has expired." });
      }
      return res.status(500).json({ auth: false, message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
