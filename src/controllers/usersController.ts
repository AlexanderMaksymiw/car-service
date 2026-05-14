import { NextFunction, type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/client.js";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export const usersController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const user = await prisma.user.findUnique({
        where: {
          user_id: Number(user_id),
        },
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;

      await prisma.user.delete({
        where: {
          user_id: Number(user_id),
        },
      });

      res.status(204).send();
    } catch (error) {
      console.error("Delete Error:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};
