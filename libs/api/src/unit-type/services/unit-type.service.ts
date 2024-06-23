import { db, unitTypes } from '@fms/drizzle';
import {
  TQueryParams,
  TUnitTypeCreateRequest,
  TUnitTypeResponse,
  TUnitTypeSingleResponse,
  TUnitTypeUpdateRequest,
} from '@fms/entities';
import { asc, eq, ilike } from 'drizzle-orm';

export const unitTypeService = {
  pagination: async (params: TQueryParams): Promise<TUnitTypeResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(unitTypes)
      .where(ilike(unitTypes.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(unitTypes.name));
    const count = await db
      .select({ id: unitTypes.id })
      .from(unitTypes)
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
  detail: async (id: string): Promise<TUnitTypeSingleResponse> => {
    const data = await db.query.unitTypes.findFirst({
      where: eq(unitTypes.id, id),
      columns: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data,
    };
  },
  create: async (
    request: TUnitTypeCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.insert(unitTypes).values({ name: request.name }).returning();
    return {
      message: 'Create Unit Type Success',
    };
  },
  update: async (
    request: TUnitTypeUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db
      .update(unitTypes)
      .set({ name: request.name })
      .where(eq(unitTypes.id, request.id));
    return {
      message: 'Update Unit Type Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(unitTypes).where(eq(unitTypes.id, id));
    return {
      message: 'Delete Unit Type Success',
    };
  },
};
