const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

function userAuthentication(req, res, next) {
  const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
  // Get the JWT token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // If there is no token, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Missing JWT token" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, jwtSecret);

    // Find the user associated with the token
    User.findOne({ email: decoded.email })
      .then((user) => {
        // If the user does not exist, send a 401 Unauthorized response
        if (!user) {
          return res.status(401).json({ message: "Invalid JWT token" });
        }

        // Set the user object on the request for use in subsequent middleware
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      });
  } catch (err) {
    // If the token is invalid, send a 401 Unauthorized response
    console.error(err);
    res.status(401).json({ message: "Invalid JWT token" });
  }
}

module.exports = userAuthentication;
