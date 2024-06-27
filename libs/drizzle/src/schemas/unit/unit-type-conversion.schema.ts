import { doublePrecision, pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { unitTypes } from './unit-type.schema';

export const unitTypeConversions = pgTable('unit_type_conversions', {
  fromUnitTypeId: uuid('from_unit_type_id')
    .notNull()
    .references(() => unitTypes.id, { onDelete: 'cascade' }),
  toUnitTypeId: uuid('to_unit_type_id')
    .notNull()
    .references(() => unitTypes.id, { onDelete: 'cascade' }),
  conversionFactor: doublePrecision('conversion_factor').notNull(),
  ...baseSchema,
});

export const unitConversionRelations = relations(
  unitTypeConversions,
  ({ one }) => ({
    fromUnitType: one(unitTypes, {
      fields: [unitTypeConversions.fromUnitTypeId],
      references: [unitTypes.id],
      relationName: 'from_unit_type',
    }),
    toUnitType: one(unitTypes, {
      fields: [unitTypeConversions.toUnitTypeId],
      references: [unitTypes.id],
      relationName: 'to_unit_type',
    }),
  })
);
