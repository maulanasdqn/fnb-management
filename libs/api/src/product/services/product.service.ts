import { db, products } from '@fms/drizzle';
import { TProductQueryParams } from '@fms/entities';
import { ilike, asc } from 'drizzle-orm';

export const findMany = async (params?: TProductQueryParams) => {
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

  console.log(data);
  console.log(params);

  return data;
};

export const findOne = async (id: string) => {
  return;
};

export const create = async () => {
  return;
};

export const update = async () => {
  return;
};
export const deleteData = async () => {
  return;
};
