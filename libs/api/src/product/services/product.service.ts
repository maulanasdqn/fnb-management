import { db, products } from '@fms/drizzle';
import {
  TProductCreateRequest,
  TProductUpdateRequest,
  TProductResponse,
  TProductSingleResponse,
  TQueryParams,
} from '@fms/entities';
import { ilike, asc, eq } from 'drizzle-orm';

export const findMany = async (
  params?: TQueryParams
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

  return {
    meta: {
      page: 1,
      perPage: 10,
      totalPage: 1,
    },
    data: data,
  };
};

export const findOne = async (id: string): Promise<TProductSingleResponse> => {
  const data = await db
    .select({
      id: products.id,
      name: products.name,
      priceSelling: products.priceSelling,
      image: products.image,
      description: products.description,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(eq(products.id, id))
    .then((data) => data?.at(0));
  return {
    message: 'Success',
    data: data,
  };
};

export const create = async ({
  name,
  priceSelling,
  productCategoryId,
  image,
  price,
  recipeId,
  description,
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
      recipeId,
    })
    .returning();
  return {
    message: 'Create Product Success',
    data: data[0],
  };
};

export const update = async ({
  id,
  name,
  priceSelling,
  productCategoryId,
  image,
  price,
  recipeId,
  description,
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
      recipeId,
    })
    .where(eq(products.id, id))
    .returning();
  return {
    message: 'Update Product Success',
    data: data[0],
  };
};

export const destroy = async (id: string) => {
  const data = await db.delete(products).where(eq(products.id, id)).returning();
  return {
    message: 'Delete Product Success',
    data: data[0],
  };
};
