// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import planRoutes from './routes/planRoutes.js';
dotenv.config();
import authRoutes from './routes/authRoutes.js';




const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/services", serviceRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/plans', planRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api/v1/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log("MongoDB connection failed:", err));
