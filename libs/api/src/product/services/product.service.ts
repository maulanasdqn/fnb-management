import { db, products } from '@fms/drizzle';
import {
  TProductQueryParams,
  TProductResponse,
  TProductSingleResponse,
} from '@fms/entities';
import { ilike, asc, eq } from 'drizzle-orm';

export const findMany = async (
  params?: TProductQueryParams
): Promise<TProductResponse> => {
  const data = await db
    .select({
      id: products.id,
      name: products.name,
      priceSelling: products.priceSelling,
      image: products.image,
      description: products.description,
    })
    .from(products)
    .where(ilike(products.name, `%${params?.search || ''}%`))
    .orderBy(asc(products.name));

  return data;
};

export const findOne = async (id: string): Promise<TProductSingleResponse> => {
  const data = await db
    .select({
      id: products.id,
      name: products.name,
      priceSelling: products.priceSelling,
      image: products.image,
      description: products.description,
    })
    .from(products)
    .where(eq(products.id, id))
    .then((data) => data?.at(0));

  return data as TProductSingleResponse;
};

export const create = async () => {
  return;
};

export const update = async () => {
  return;
};

export const deleteData = async (id :string) => {
  await db.delete(products).where(eq(products.id, id));
};
