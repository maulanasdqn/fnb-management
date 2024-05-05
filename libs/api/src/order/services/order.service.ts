import { db, orders, customers, orderDetails } from '@fms/drizzle';
import { TOrderCreateRequest } from '@fms/entities';

const findOne = async (id: string) => {
  return;
};
const findMany = async () => {
  return;
};

export const create = async (request: TOrderCreateRequest) => {
  const products: {
    productId: string;
    amount: number;
    orderId: string;
  }[] = [];
  await db.transaction(async (tx) => {
    const customer = await tx
      .insert(customers)
      .values({
        name: request.customerName,
        phoneNumber: request.customerPhoneNumber,
      })
      .returning();

    const order = await tx
      .insert(orders)
      .values({
        customerId: customer[0].id,
        placeId: request?.placeId,
        amountTotal: 10000,
        paymentId: request.paymentId,
        invoiceNumber: 'INV',
      })
      .returning();

    for await (const item of request.products) {
      products.push({
        productId: item.id,
        amount: item.amount,
        orderId: String(order[0].id),
      });
    }
    await tx.insert(orderDetails).values(products);
  });

  return {
    message: 'Success create order',
  };
};

const update = async () => {
  return;
};
const deletes = async () => {
  return;
};
