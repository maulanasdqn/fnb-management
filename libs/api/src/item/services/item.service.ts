import { db, items } from '@fms/drizzle';
import {
  TItemQueryParams,
  TItemCreateRequest,
  TItemUpdateRequest,
  TItemResponse,
  TItemSingleResponse,
} from '@fms/entities';
import { ilike, asc, eq } from 'drizzle-orm';

export const findMany = async (
  params?: TItemQueryParams
): Promise<TItemResponse> => {
  const data = await db
    .select({
      id: items.id,
      name: items.name,
      price: items.price,
      itemAmount: items.itemAmount,
      itemAmountTypeId: items.itemAmountTypeId,
      ingredientUnit: items.ingredientUnit,
      ingredientAmount: items.ingredientAmount,
    })
    .from(items)
    .where(ilike(items.name, `%${params?.search || ''}%`))
    .orderBy(asc(items.name));

  return data;
};

export const findOne = async (id: string): Promise<TItemSingleResponse> => {
  const data = await db
    .select({
      id: items.id,
      name: items.name,
      price: items.price,
      itemAmount: items.itemAmount,
      itemAmountTypeId: items.itemAmountTypeId,
      ingredientUnit: items.ingredientUnit,
      ingredientAmount: items.ingredientAmount,
    })
    .from(items)
    .where(eq(items.id, id))
    .then((data) => data?.at(0));

  return data as TItemSingleResponse;
};

export const create = async ({
  name,
  price,
  itemAmount,
  itemAmountTypeId,
  ingredientUnit,
  ingredientAmount,
}: TItemCreateRequest): Promise<TItemSingleResponse> => {
  const data = await db
    .insert(items)
    .values({
      name,
      price,
      itemAmount,
      itemAmountTypeId,
      ingredientUnit,
      ingredientAmount,
    })
    .returning();

  return data[0] as TItemSingleResponse;
};

export const update = async ({
  id,
  name,
  price,
  itemAmount,
  itemAmountTypeId,
  ingredientUnit,
  ingredientAmount,
}: TItemUpdateRequest) => {
  const data = await db
    .update(items)
    .set({
      name,
      price,
      itemAmount,
      itemAmountTypeId,
      ingredientUnit,
      ingredientAmount,
    })
    .where(eq(items.id, id))
    .returning();

  return data[0] as TItemSingleResponse;
};

export const destroy = async (id: string) => {
  const data = await db
    .delete(items)
    .where(eq(items.id, id))
    .returning();
  return data[0] as TItemSingleResponse;
};
