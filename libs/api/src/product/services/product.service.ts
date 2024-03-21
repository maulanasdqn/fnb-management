import { db, products } from '@fms/drizzle';
import { TCProductQueryParams } from '@fms/entities';
import { ilike, asc } from 'drizzle-orm';

export const findManyProducts = async (params?: TCProductQueryParams) => {
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
