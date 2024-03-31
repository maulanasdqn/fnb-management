import { db, products } from '@fms/drizzle';
import {
  TProductQueryParams,
  TProductCreateRequest,
  TProductUpdateRequest,
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

export const create = async ({
  name,
  priceSelling,
  productCategoryId,
  image,
  price,
  recipeId,
  description
}: TProductCreateRequest): Promise<TProductSingleResponse> => {
  const data = await db
    .insert(products)
    .values({
      name,
      price,
      priceSelling,
      productCategoryId,
      image,
      description,
      recipeId
    })
    .returning();
  return data[0] as TProductSingleResponse;
};

export const update = async ({
  id,
  name,
  priceSelling,
  productCategoryId,
  image,
  price,
  recipeId,
  description
}: TProductUpdateRequest) => {
  const data = await db
    .update(products)
    .set({
      name,
      price,
      priceSelling,
      productCategoryId,
      image,
      description,
      recipeId
    })
    .where(eq(products.id, id))
    .returning();
  return data[0] as TProductSingleResponse;
};

export const destroy = async (id: string) => {
  const data = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return data[0] as TProductSingleResponse;
};
