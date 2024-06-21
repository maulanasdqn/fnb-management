import {
  TPurchaseCreateRequest,
  TPurchaseResponse,
  TPurchaseSingleResponse,
  TQueryParams,
  EPurchaseStatus,
  TPurchaseUpdateRequest,
  TPurchaseApprovalRequest,
} from '@fms/entities';
import { db, purchaseDetails, purchases, suppliers } from '@fms/drizzle';
import { asc, eq, ilike } from 'drizzle-orm';

export const purchaseService = {
  pagination: async (params?: TQueryParams): Promise<TPurchaseResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: purchases.id,
        amountTotal: purchases.amountTotal,
        invoiceNumber: purchases.invoiceNumber,
        status: purchases.status,
        createdAt: purchases.createdAt,
        updatedAt: purchases.updatedAt,
        supplier: {
          id: suppliers.id,
          fullName: suppliers.fullName,
        },
      })
      .from(purchases)
      .where(ilike(purchases.invoiceNumber, `%${params?.search || ''}%`))
      .leftJoin(suppliers, eq(suppliers.id, purchases.supplierId))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(purchases.invoiceNumber));

    const count = await db
      .select({ id: purchases.id })
      .from(purchases)
      .then((res) => res.length);

    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    return {
      meta: {
        page,
        nextPage,
        prevPage,
        perPage,
        totalPage,
      },
      data,
    };
  },
  findOne: async (id: string): Promise<TPurchaseSingleResponse> => {
    const purchase = await db.query.purchases.findFirst({
      where: eq(purchases.id, id),
      columns: {
        id: true,
        amountTotal: true,
        invoiceNumber: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        supplier: true,
        purchaseDetails: {
          columns: {
            amount: true,
            price: true,
          },
          with: {
            unitType: {
              columns: {
                id: true,
                name: true,
              },
            },
            ingredient: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!purchase) {
      throw Error('Purchase not found');
    }
    const { supplier, ...restData } = purchase;
    return {
      data: {
        ...restData,
        supplier: {
          id: supplier.id,
          fullName: supplier.fullName,
        },
      },
    };
  },

  create: async (
    data: TPurchaseCreateRequest
  ): Promise<{ message: string }> => {
    await db.transaction(async (tx) => {
      const amountTotal = data.details.reduce(
        (acc, item) => acc + +item.price,
        0
      );
      const createPurchase = await tx
        .insert(purchases)
        .values({
          amountTotal: amountTotal,
          supplierId: data.supplierId,
          invoiceNumber: '1',
          status: EPurchaseStatus.Ordered,
        })
        .returning({
          id: purchases.id,
        })
        .then((data) => data[0]);

      for await (const item of data.details) {
        await tx.insert(purchaseDetails).values({
          purchaseId: createPurchase.id,
          price: item.price,
          amount: item.amount,
          unitTypeId: item.unitTypeId,
          ingredientId: item.ingredientId,
        });
      }
    });

    return {
      message: 'Create Purchase Success',
    };
  },

  update: async (
    data: TPurchaseUpdateRequest
  ): Promise<{ message: string }> => {
    await db.transaction(async (tx) => {
      await tx
        .update(purchases)
        .set({
          supplierId: data.supplierId,
        })
        .where(eq(purchases.id, data.id));

      await tx
        .delete(purchaseDetails)
        .where(eq(purchaseDetails.purchaseId, data.id));

      for await (const item of data.details) {
        await tx
          .insert(purchaseDetails)
          .values({
            purchaseId: data.id,
            price: item.price,
            amount: item.amount,
            unitTypeId: item.unitTypeId,
            ingredientId: item.ingredientId,
          });
      }
    });
    return {
      message: 'Update Purchase Success',
    };
  },

  requestPurhase: async (
    data: TPurchaseCreateRequest
  ): Promise<{ message: string }> => {
    await db.transaction(async (tx) => {
      const amountTotal = data.details.reduce(
        (acc, item) => acc + +item.price,
        0
      );
      const createPurchase = await tx
        .insert(purchases)
        .values({
          amountTotal: amountTotal,
          supplierId: data.supplierId,
          invoiceNumber: '1',
          status: EPurchaseStatus.Pending,
        })
        .returning({
          id: purchases.id,
        })
        .then((data) => data[0]);

      for await (const item of data.details) {
        await tx
          .insert(purchaseDetails)
          .values({
            purchaseId: createPurchase.id,
            price: item.price,
            amount: item.amount,
            unitTypeId: item.unitTypeId,
            ingredientId: item.ingredientId,
          });
      }
    });

    return {
      message: 'Create Purchase Success',
    };
  },

  approval: async (
    data: TPurchaseApprovalRequest
  ): Promise<{ message: string }> => {
    await db
      .update(purchases)
      .set({
        status: data.status,
        rejectionNote: data.rejectionNote,
      })
      .where(eq(purchases.id, data.id));
    return {
      message: 'Update Purchase Success',
    };
  },
};
