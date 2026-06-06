import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: `http://localhost:${process.env.PORT}` || "http://localhost:3000",
}));
app.use(helmet());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Expense Track API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});