import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";


const JWT_SECRET = process.env.JWT_SECRET || "my-secret";

export const loginUser = async (req, res) => {
  const [email, password] = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        message: "Not valid email",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        message: "Invalid",
      });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
