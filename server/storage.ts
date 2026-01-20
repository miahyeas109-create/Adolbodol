import { db } from "./db";
import { items, type InsertItem, type Item } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getItems(): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
}

export class DatabaseStorage implements IStorage {
  async getItems(): Promise<Item[]> {
    return await db.select().from(items).orderBy(items.createdAt);
  }

  async getItem(id: number): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item;
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const [newItem] = await db.insert(items).values(insertItem).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
