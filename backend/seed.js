// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("User already exists.");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash("admin123", 10);
  const user = new User({
    name: "Admin",
    email: "admin@example.com",
    password: passwordHash,
  });

  await user.save();
  console.log("✅ Admin user seeded.");
  process.exit(0);
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
});
