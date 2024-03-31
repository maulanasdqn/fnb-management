import { db, unitTypes } from '@fms/drizzle';
import {
  TQueryParams,
  TUnitTypeCreateRequest,
  TUnitTypeResponse,
  TUnitTypeSingleResponse,
  TUnitTypeUpdateRequest,
} from '@fms/entities';
import { TRPCError } from '@trpc/server';
import { asc, eq, ilike } from 'drizzle-orm';

export const findOneUnitType = async (
  request: TQueryParams
): Promise<TUnitTypeSingleResponse> => {
  const res = await db
    .select({
      id: unitTypes.id,
      name: unitTypes.name,
      createdAt: unitTypes.createdAt,
      updatedAt: unitTypes.updatedAt,
    })
    .from(unitTypes)
    .where(eq(unitTypes.id, request?.id as string))
    .then((res) => res.at(0));

  if (!res) {
    throw new TRPCError({
      message: 'Unit type tidak ditemukan',
      code: 'BAD_REQUEST',
    });
  }
  return {
    message: 'Berhasil mengambil data',
    data: res,
  };
};

export const findManyUnitType = async (
  request: TQueryParams
): Promise<TUnitTypeResponse> => {
  const res = await db
    .select({
      id: unitTypes.id,
      name: unitTypes.name,
      createdAt: unitTypes.createdAt,
      updatedAt: unitTypes.updatedAt,
    })
    .from(unitTypes)
    .where(ilike(unitTypes.name, `%${request?.search || ''}%`))
    .orderBy(asc(unitTypes.name));

  return {
    message: 'Berhasil mengambil data',
    data: res,
    meta: {
      page: 1,
      perPage: 10,
      totalPage: 1,
    },
  };
};

export const createUnitType = async (
  request: TUnitTypeCreateRequest
): Promise<TUnitTypeSingleResponse> => {
  const res = await db
    .insert(unitTypes)
    .values({
      name: request.name,
    })
    .returning()
    .then((res) => res.at(0));
  if (!res) {
    throw new TRPCError({
      message: 'Gagal menambahkan unit type',
      code: 'BAD_REQUEST',
    });
  }
  return {
    message: 'Unit type berhasil dibuat',
    data: res,
  };
};

export const updateUnitType = async (
  request: TUnitTypeUpdateRequest
): Promise<TUnitTypeSingleResponse> => {
  const res = await db
    .update(unitTypes)
    .set({
      name: request.name,
      updatedAt: new Date(),
    })
    .where(eq(unitTypes.id, request.id as string))
    .returning()
    .then((res) => res.at(0));

  if (!res) {
    throw new TRPCError({
      message: 'Gagal update unit type',
      code: 'BAD_REQUEST',
    });
  }
  return {
    message: 'Unit type berhasil diupdate',
    data: res,
  };
};

export const deleteUnitType = async (
  request: TQueryParams
): Promise<TUnitTypeSingleResponse> => {
  const res = await db
    .delete(unitTypes)
    .where(eq(unitTypes.id, request?.id as string))
    .returning()
    .then((res) => res.at(0));
  if (!res) {
    throw new TRPCError({
      message: 'Gagal delete unit type',
      code: 'BAD_REQUEST',
    });
  }
  return {
    message: 'Unit type berhasil dihapus',
    data: res,
  };
};
