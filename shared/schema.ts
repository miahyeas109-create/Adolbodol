import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ১. টেবিল ডেফিনিশন (Database Table Structure)
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  condition: text("condition").notNull(),
  exchangePreferences: text("exchange_preferences").notNull(),
  location: text("location").notNull(),
  contactInfo: text("contact_info").default("Not provided"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ২. ইনসার্ট স্কিমা (Validation for Form)
export const insertItemSchema = createInsertSchema(items).omit({
  id: true,
  createdAt: true,
});

// ৩. টাইপ এক্সপোর্ট (Type Definitions)
export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;
