import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { variantOptions } from './variant-option.schema';

export const variants = pgTable('variants', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const variantRelations = relations(variants, ({ many }) => ({
  varianOptions: many(variantOptions),
}));
