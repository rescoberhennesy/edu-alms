import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

app.use(cors());
app.use(express.json());

// --- THE .EDU VALIDATION ---
const isEduEmail = (email: string) => email.toLowerCase().endsWith(".edu");

// --- REGISTER ROUTE ---
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!isEduEmail(email)) {
    return res.status(400).json({ error: "Only .edu emails are allowed." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "STUDENT",
      },
    });

    // Automatically log this for the Admin
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: `New account created: ${role}`,
      },
    });

    res.status(201).json({ message: "User created!", userId: user.id });
  } catch (error) {
    res.status(400).json({ error: "Email already exists." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
