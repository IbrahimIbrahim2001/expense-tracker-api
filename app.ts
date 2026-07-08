import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import helmet from "helmet";
import AuthRouter from "./src/auth/auth.router.ts";
import TransactionsRouter from "./src/transactions/transactions.router.ts";
import DashboardRouter from "./src/dashboard/dashboard.router.ts";
import BudgetRouter from "./src/budget/budget.router.ts";

import { connectDB } from "./config/connectDB.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";
import { startCleanupJob } from "./src/cron/cleanup.ts";

import path from "node:path";

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));
// app.use(helmet());

// connect to database
await connectDB();

if (process.env.VERCEL !== "1") {
  startCleanupJob();
}

// TESTING
app.get('/', (req, res) => {
  res.json({ message: 'Expense Track API is running' });
});

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/transactions", TransactionsRouter);
app.use("/api/dashboard", DashboardRouter);
const uploadsDir = process.env.VERCEL === "1"
  ? "/tmp/uploads"
  : path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsDir));
app.use("/api/budget", BudgetRouter);


// global error handler 
app.use(errorMiddleware);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;