import {
  TPlaceCreateRequest,
  TPlaceResponse,
  TPlaceSingleResponse,
  TPlaceUpdateRequest,
  TQueryParams,
} from '@fms/entities';
import { db, places } from '@fms/drizzle';
import { asc, eq, ilike } from 'drizzle-orm';
export const placeService = {
  create: async (
    data: TPlaceCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.insert(places).values({
      name: data.name,
    });
    return {
      message: 'Create Place Success',
    };
  },
  update: async (
    data: TPlaceUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.update(places).set({
      name: data.name,
    });
    return {
      message: 'Update Place Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(places).where(eq(places.id, id));
    return {
      message: 'Delete Place Success',
    };
  },
  paginations: async (params: TQueryParams): Promise<TPlaceResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(places)
      .where(ilike(places.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(places.name));

    const count = await db
      .select({ id: places.id })
      .from(places)
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
  detail: async (id: string): Promise<TPlaceSingleResponse> => {
    const data = await db
      .select()
      .from(places)
      .where(eq(places.id, id))
      .then((data) => data[0]);

    return { data };
  },
};
