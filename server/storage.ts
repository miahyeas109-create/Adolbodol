import { items, type Item, type InsertItem } from "@shared/schema";

// ইন্টারফেস তৈরি যা ডিফাইন করে স্টোরেজ কী কী কাজ করবে
export interface IStorage {
  getItems(): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
}

// মেমোরি স্টোরেজ ক্লাস (আপাতত ডাটা র‍্যামে সেভ হবে)
export class MemStorage implements IStorage {
  private items: Map<number, Item>;
  private currentId: number;

  constructor() {
    this.items = new Map();
    this.currentId = 1;
  }

  async getItems(): Promise<Item[]> {
    return Array.from(this.items.values());
  }

  async getItem(id: number): Promise<Item | undefined> {
    return this.items.get(id);
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const id = this.currentId++;
    const item: Item = { ...insertItem, id, createdAt: new Date() };
    this.items.set(id, item);
    return item;
  }
}

export const storage = new MemStorage();
