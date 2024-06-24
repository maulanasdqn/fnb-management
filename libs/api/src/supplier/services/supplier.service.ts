import {
  TQueryParams,
  TSupplierCreateRequest,
  TSupplierResponse,
  TSupplierSingleResponse,
  TSupplierUpdateRequest,
} from '@fms/entities';
import { db, suppliers } from '@fms/drizzle';
import { eq, asc, ilike } from 'drizzle-orm';
export const supplierService = {
  pagination: async (params?: TQueryParams): Promise<TSupplierResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(suppliers)
      .where(ilike(suppliers.fullName, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(suppliers.fullName));

    const count = await db
      .select({ id: suppliers.id })
      .from(suppliers)
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
  detail: async (id: string): Promise<TSupplierSingleResponse> => {
    const data = await db.query.suppliers.findFirst({
      where: eq(suppliers.id, id),
    });
    return { data };
  },
  create: async (
    data: TSupplierCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.insert(suppliers).values({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: data.address,
    });
    return {
      message: 'Create Supplier Success',
    };
  },
  update: async (
    data: TSupplierUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db
      .update(suppliers)
      .set({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
      })
      .where(eq(suppliers.id, data.id));

    return {
      message: 'Update Supplier Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(suppliers).where(eq(suppliers.id, id));

    return {
      message: 'Delete Supplier Success',
    };
  },
};
