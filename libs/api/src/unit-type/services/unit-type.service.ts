import { db, unitTypeConversions, unitTypes } from '@fms/drizzle';
import {
  TQueryParams,
  TUnitType,
  TUnitTypeCreateRequest,
  TUnitTypeResponse,
  TUnitTypeSingleResponse,
  TUnitTypeUpdateRequest,
} from '@fms/entities';
import { asc, eq, ilike, like } from 'drizzle-orm';

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
      with: {
        fromUnits: {
          columns: {
            conversionFactor: true,
          },
          with: {
            toUnitType: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      throw new Error('Unit Type not found');
    }

    return {
      data: {
        id: data.id,
        name: data.name,
        conversions: data.fromUnits,
      },
    };
  },
  create: async (
    request: TUnitTypeCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.transaction(async (tx) => {
      const createUnitType = await tx
        .insert(unitTypes)
        .values({ name: request.name })
        .returning({
          id: unitTypes.id,
        })
        .then((res) => res[0]);

      if (request?.conversions) {
        for await (const conversion of request.conversions) {
          await tx.insert(unitTypeConversions).values({
            fromUnitTypeId: createUnitType.id,
            toUnitTypeId: conversion.toUnitTypeId,
            conversionFactor: conversion.conversionFactor,
          });
        }
      }
    });
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

    await db.transaction(async (tx) => {
      if (request?.name) {
        await tx
          .update(unitTypes)
          .set({ name: request.name })
          .where(eq(unitTypes.id, request.id));
      }

      if (request?.conversions) {
        await tx
          .delete(unitTypeConversions)
          .where(eq(unitTypeConversions.fromUnitTypeId, request.id));

        for await (const conversion of request.conversions) {
          await tx.insert(unitTypeConversions).values({
            fromUnitTypeId: request.id,
            toUnitTypeId: conversion.toUnitTypeId,
            conversionFactor: conversion.conversionFactor,
          });
        }
      }
    });
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
  findAllWithSearch: async (search?: string): Promise<TUnitType[]> => {
    return await db.query.unitTypes.findMany({
      where: like(unitTypes.name, `%${search || ''}%`),
    });
  },
};
