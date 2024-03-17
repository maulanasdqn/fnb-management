import { pgTable, pgEnum, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { suppliers } from '../supplier/supplier.schema';
import { purchaseDetails } from './purchase-detail.schema';

export const purchaseEnum = pgEnum('purchaseEnum', ['received', 'ordered']);

export const purchases = pgTable('purchases', {
  id: uuid('id').defaultRandom().primaryKey(),
  amountTotal: text('amount_total').notNull(),
  invoiceNumber: text('invoice_number').notNull(),
  supplierId: uuid('supplier_id')
    .notNull()
    .references(() => suppliers.id),
  status: purchaseEnum('status'),
  ...baseSchema,
});

export const purchaseRelations = relations(purchases, ({ one, many }) => ({
  supplier: one(suppliers, {
    fields: [purchases.supplierId],
    references: [suppliers.id],
  }),
  purchaseDetail: many(purchaseDetails),
}));
