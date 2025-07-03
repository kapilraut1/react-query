import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // use .env later
const seedUser = async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  const user = new User({ name: "Kapil", email: "kapil@gmail.com", password: hashed });
  await user.save();
  console.log("Seeded admin user");
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  console.log(req.user); // { id, role }
  const users = await User.find();
  res.json(users);
};
