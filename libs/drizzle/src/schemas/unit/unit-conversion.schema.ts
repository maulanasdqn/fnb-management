import { doublePrecision, pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { unitTypes } from './unit-type.schema';

export const unitConversions = pgTable('unit_conversions', {
  fromUnitId: uuid('from_unit_id')
    .notNull()
    .references(() => unitTypes.id),
  toUnitId: uuid('to_unit_id')
    .notNull()
    .references(() => unitTypes.id),
  conversionFactor: doublePrecision('conversion_factor').notNull(),
  ...baseSchema,
});

export const unitConversionRelations = relations(
  unitConversions,
  ({ one }) => ({
    fromUnit: one(unitTypes, {
      fields: [unitConversions.fromUnitId],
      references: [unitTypes.id],
      relationName: 'from_unit',
    }),
    toUnit: one(unitTypes, {
      fields: [unitConversions.toUnitId],
      references: [unitTypes.id],
      relationName: 'to_unit',
    }),
  })
);
