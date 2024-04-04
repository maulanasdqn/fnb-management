import { db, items, itemLogs } from '@fms/drizzle';
import {
  TItemQueryParams,
  TItemCreateRequest,
  TItemUpdateRequest,
  TItemResponse,
  TItemSingleResponse,
} from '@fms/entities';
import { ilike, asc, eq, desc } from 'drizzle-orm';

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
  quantity,
  ingredientAmount,
}: TItemCreateRequest): Promise<TItemSingleResponse> => {

  const returnData: TItemSingleResponse = await db.transaction(
    async (tx) => {
      const data = await tx
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

      if (!data[0].id) {
        return data[0] as TItemSingleResponse;
      }

      await tx
        .insert(itemLogs)
        .values({
          itemId: data[0].id,
          qtyBefore: '0',
          qtyCurrent: quantity ? quantity.toString() : '0',
          qtyAfter: quantity ? quantity.toString() : '0',
        })
        .returning();

      return data[0] as TItemSingleResponse;
    }
  )
  return returnData as TItemSingleResponse;
};

export const update = async ({
  id,
  name,
  price,
  quantity,
  itemAmount,
  itemAmountTypeId,
  ingredientUnit,
  ingredientAmount,
}: TItemUpdateRequest) => {
  const returnData: TItemSingleResponse = await db.transaction(
    async (tx) => {
      const data = await tx
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

      if (!data[0].id) {
        return data[0] as TItemSingleResponse;
      }

      let qtyBefore = 0
      let qtyAfter = quantity

      const logs = await tx
        .select({
          qtyAfter: itemLogs.qtyAfter,
        })
        .from(itemLogs)
        .where(eq(itemLogs.itemId, id))
        .orderBy(desc(
          itemLogs.createdAt
        ));

      if (logs.length > 0) {
        qtyBefore = Number(logs[0].qtyAfter);
        qtyAfter = quantity
          ? Number(logs[0].qtyAfter) + Number(quantity)
          : Number(logs[0].qtyAfter);
      }

      if (quantity !== qtyBefore) {
        await tx
          .insert(itemLogs)
          .values({
            itemId: data[0].id,
            qtyBefore: qtyBefore.toString(),
            qtyCurrent: quantity ? quantity.toString() : '0',
            qtyAfter: qtyAfter.toString(),
          })
          .returning();

      }

      return data[0] as TItemSingleResponse;
    }
  )
  return returnData as TItemSingleResponse;
};

export const destroy = async (id: string) => {
  const data = await db
    .delete(items)
    .where(eq(items.id, id))
    .returning();
  return data[0] as TItemSingleResponse;
};
