import { pgTable } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';

export const unitConversions = pgTable('unit_conversions', {
  ...baseSchema,
});
