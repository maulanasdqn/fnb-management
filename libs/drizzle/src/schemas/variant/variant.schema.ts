import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { variantOptions } from './variant-option.schema';

export const variants = pgTable('variants', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const variantRelations = relations(variants, ({ many }) => ({
  variantOptions: many(variantOptions),
}));
