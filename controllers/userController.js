const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateEmail, validateLength } = require("../helpers/validation");
const { generateToken } = require("../helpers/token");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // console.log(req.body);

    // Check if email already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Validate Username length
    if (!validateLength(username, 3, 30)) {
      return res.status(400).json({
        message: "Username must be between 3 and 30 characters.",
      });
    }

    // Validate password length
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    // Hash the password
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Create a new user object
    const newUser = new User({
      username,
      email,
      password: cryptedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate authentication token
    const authToken = generateToken({ id: newUser._id.toString() }, "7d");

    return res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message: "Registration successful. Please activate your account",
      authToken: authToken,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      email: user.email,
      token: token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
