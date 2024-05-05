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
  const page = params?.page || 1;
  const perPage = params?.perPage || 10;
  const offset = (page - 1) * perPage;

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
    .limit(perPage)
    .offset(params?.search ? 0 : offset)
    .orderBy(asc(products.name));

  const count = await db
    .select({ id: products.id })
    .from(products)
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
      deletedAt: products.deletedAt,
    })
    .from(products)
    .where(eq(products.id, id))
    .then((data) => data?.at(0));
  return {
    message: 'Success',
    data,
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
  await db
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
  await db
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
  };
};

export const destroy = async (id: string) => {
  await db.delete(products).where(eq(products.id, id)).returning();
  return {
    message: 'Delete Product Success',
  };
};
