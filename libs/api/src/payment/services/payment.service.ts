import {
  TPayment,
  TPaymentCreateRequest,
  TPaymentResponse,
  TPaymentSingleResponse,
  TPaymentUpdateRequest,
  TQueryParams,
} from '@fms/entities';
import { db, payments } from '@fms/drizzle';
import { eq, ilike, asc } from 'drizzle-orm';

export const paymentService = {
  create: async (
    data: TPaymentCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.insert(payments).values({
      name: data.name,
      accountName: data.accountName,
      accountNumber: data.accountNumber,
    });
    return {
      message: 'Create Payment Success',
    };
  },
  update: async (
    data: TPaymentUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.update(payments).set(data).where(eq(payments.id, data.id));
    return {
      message: 'Update Payment Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(payments).where(eq(payments.id, id));
    return {
      message: 'Delete Payment Success',
    };
  },
  paginations: async (data: TQueryParams): Promise<TPaymentResponse> => {
    const page = data?.page || 1;
    const perPage = data?.perPage || 10;
    const offset = (page - 1) * perPage;

    const result = await db
      .select()
      .from(payments)
      .where(ilike(payments.name, `%${data?.search || ''}%`))
      .limit(perPage)
      .offset(data?.search ? 0 : offset)
      .orderBy(asc(payments.name));

    const count = await db
      .select({ id: payments.id })
      .from(payments)
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
      data: result,
    };
  },
  detail: async (id: string): Promise<TPaymentSingleResponse> => {
    const data = await db.query.payments.findFirst({
      where: eq(payments.id, id),
    });

    if (!data) {
      throw new Error('Payment not found');
    }

    return {
      data,
    };
  },
  findAllWithSearch: async (search?: string): Promise<TPayment[]> => {
    return await db
      .select()
      .from(payments)
      .where(ilike(payments.name, `%${search || ''}%`))
      .orderBy(asc(payments.name));
  },
};
