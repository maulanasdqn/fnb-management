import {
  db,
  orders,
  customers,
  orderDetails,
  orderVariantOptions,
} from '@fms/drizzle';
import {
  TOrderCreateRequest,
  TOrderResponse,
  TOrderSingleResponse,
  TOrderUpdateRequest,
  TQueryParams,
} from '@fms/entities';
import { desc, eq, ilike } from 'drizzle-orm';

export const orderService = {
  pagination: async (params: TQueryParams): Promise<TOrderResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db.query.orders.findMany({
      columns: {
        id: true,
        amountTotal: true,
        status: true,
        isPaid: true,
        invoiceNumber: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        customer: {
          columns: {
            id: true,
            name: true,
            phoneNumber: true,
          },
        },
        payment: {
          columns: {
            id: true,
            name: true,
          },
        },
        place: {
          columns: {
            id: true,
            name: true,
          },
        },
        details: {
          columns: {
            quantity: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
              },
            },
            orderVariantOptions: {
              with: {
                variantOption: {
                  columns: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },

      limit: perPage,
      offset: params?.search ? 0 : offset,
      orderBy: [desc(orders.createdAt)],
    });

    const count = await db
      .select({ id: orders.id })
      .from(orders)
      .then((res) => res.length);

    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    const result = data.map((item) => {
      return {
        id: item.id,
        amountTotal: item.amountTotal,
        status: item.status,
        isPaid: item.isPaid,
        invoiceNumber: item.invoiceNumber,
        type: item.type,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        customer: item.customer,
        payment: item.payment,
        place: item.place,
        details: item.details.map((item) => {
          return {
            quantity: item.quantity,
            product: item.product,
            variantOptions: item.orderVariantOptions.map((item) => {
              return {
                id: item.variantOption.id,
                name: item.variantOption.name,
              };
            }),
          };
        }),
      };
    });

    return {
      meta: {
        page,
        nextPage,
        prevPage,
        perPage,
        totalPage,
      },
      data: result,
    };
  },
  update: async (
    data: TOrderUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db
      .update(orders)
      .set({
        status: data.status,
        isPaid: data.isPaid,
      })
      .where(eq(orders.id, data.id));

    return {
      message: 'Update Order Success',
    };
  },
  create: async (
    request: TOrderCreateRequest
  ): Promise<{
    message: string;
  }> => {
    console.log(request);
    await db.transaction(async (tx) => {
      let customer = await tx
        .select({ id: customers.id })
        .from(customers)
        .where(ilike(customers.name, `%${request?.customerName}%`))
        .limit(1)
        .then((res) => res[0]);

      if (!customer) {
        customer = await tx
          .insert(customers)
          .values({
            name: request.customerName,
            phoneNumber: request.customerPhoneNumber,
          })
          .returning({
            id: customers.id,
          })
          .then((res) => res[0]);
      }

      const order = await tx
        .insert(orders)
        .values({
          customerId: customer.id,
          placeId: request?.placeId,
          amountTotal: 10000,
          paymentId: request?.paymentId,
          invoiceNumber: 'INV',
        })
        .returning({
          id: orders.id,
        })
        .then((res) => res[0]);

      for await (const item of request.details) {
        const crateOrderDetail = await tx
          .insert(orderDetails)
          .values({
            productId: item.productId,
            quantity: item.quantity,
            orderId: order.id,
          })
          .returning({
            id: orderDetails.id,
          })
          .then((res) => res[0]);

        for (const variantOptionId of item?.variantOptionIds || []) {
          await tx.insert(orderVariantOptions).values({
            orderDetailId: crateOrderDetail.id,
            variantOptionId: variantOptionId,
          });
        }
      }
    });

    return {
      message: 'Success create order',
    };
  },
  detail: async (id: string): Promise<TOrderSingleResponse> => {
    const data = await db.query.orders.findFirst({
      where: eq(orders.id, id),
      columns: {
        id: true,
        amountTotal: true,
        status: true,
        isPaid: true,
        invoiceNumber: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        customer: {
          columns: {
            id: true,
            name: true,
            phoneNumber: true,
          },
        },
        payment: {
          columns: {
            id: true,
            name: true,
          },
        },
        place: {
          columns: {
            id: true,
            name: true,
          },
        },
        details: {
          columns: {
            quantity: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
              },
            },
            orderVariantOptions: {
              with: {
                variantOption: {
                  columns: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!data) {
      throw new Error('Order tidak ditemukan');
    }

    const result = {
      id: data.id,
      amountTotal: data.amountTotal,
      status: data.status,
      isPaid: data.isPaid,
      invoiceNumber: data.invoiceNumber,
      type: data.type,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      customer: data.customer,
      payment: data.payment,
      place: data.place,
      details: data.details.map((item) => {
        return {
          quantity: item.quantity,
          product: item.product,
          variantOptions: item.orderVariantOptions.map((item) => {
            return {
              id: item.variantOption.id,
              name: item.variantOption.name,
            };
          }),
        };
      }),
    };
    return {
      data: result,
    };
  },
};
