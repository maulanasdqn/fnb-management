import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { suppliers } from '../supplier/supplier.schema';
import { purchaseDetails } from './purchase-detail.schema';

export const purchases = pgTable('purchases', {
  supplierId: uuid('supplier_id')
    .notNull()
    .references(() => suppliers.id, { onDelete: 'set null' }),
  amountTotal: integer('amount_total').notNull(),
  invoiceNumber: text('invoice_number').notNull(),
  status: text('status').notNull(),
  rejectionNote: text('rejection_note'),
  ...baseSchema,
});

export const purchaseRelations = relations(purchases, ({ one, many }) => ({
  supplier: one(suppliers, {
    fields: [purchases.supplierId],
    references: [suppliers.id],
  }),
  purchaseDetails: many(purchaseDetails),
}));
