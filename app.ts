import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import AuthRouter from "./src/auth/auth.router.ts";
import { connectDB } from "./config/connectDB.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(helmet());

app.use(express.json());

// connect to database
await connectDB();


// TESTING
app.get('/', (req, res) => {
  res.json({ message: 'Expense Track API is running' });
});

// routes
app.use("/api/auth", AuthRouter);


// global error handler 
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});