const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

const registerUser = async (req, res) => {
  // Extract user data from request body
  const { name, email, password } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with the same email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user object
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Return the success response with token
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    // Get user from database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ email: user.email }, jwtSecret);

    // Send response with token
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json({
      message: "User fetch succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something went wrong",
      user: null,
      error,
    });
  }
};

module.exports = {
  register: registerUser,
  login: loginUser,
  info: getUserInfo,
};
