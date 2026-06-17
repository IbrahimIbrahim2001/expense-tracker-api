import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import AuthRouter from "./src/auth/auth.router.ts";
import TransactionsRouter from "./src/transactions/transactions.router.ts";
import { connectDB } from "./config/connectDB.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";
import { startCleanupJob } from "./src/cron/cleanup.ts";

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

startCleanupJob();

// TESTING
app.get('/', (req, res) => {
  res.json({ message: 'Expense Track API is running' });
});

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/transactions", TransactionsRouter)

// global error handler 
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});