import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.items.list.path, async (req, res) => {
    const items = await storage.getItems();
    res.json(items);
  });

  app.get(api.items.get.path, async (req, res) => {
    const item = await storage.getItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  });

  app.post(api.items.create.path, async (req, res) => {
    try {
      const input = api.items.create.input.parse(req.body);
      const item = await storage.createItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingItems = await storage.getItems();
  if (existingItems.length === 0) {
    console.log("Seeding database...");
    await storage.createItem({
      title: "Himu Samagra",
      category: "বই",
      condition: "ভালো",
      exchangePreferences: "Any programming book or sci-fi novel",
      location: "Dhaka, Dhanmondi",
      contactInfo: "01700000000"
    });
    await storage.createItem({
      title: "Wireless Mouse",
      category: "ইলেকট্রনিক্স",
      condition: "নতুনের মতো",
      exchangePreferences: "Mechanical Keyboard keycaps",
      location: "Chittagong",
      contactInfo: "test@example.com"
    });
    console.log("Database seeded!");
  }
}
