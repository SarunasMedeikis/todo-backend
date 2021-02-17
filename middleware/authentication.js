const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res.status(401).send("Authentication error");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send("Invalid Token");
  }
};
