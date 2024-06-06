import { db, productCategories, products } from '@fms/drizzle';
import {
  TProductCategoryResponse,
  TProductCategorySingleResponse,
  TProductCategoryCreateRequest,
  TProductCategoryUpdateRequest,
  TQueryParams,
} from '@fms/entities';
import { ilike, asc, eq } from 'drizzle-orm';

export const findMany = async (
  params?: TQueryParams
): Promise<TProductCategoryResponse> => {
  const page = params?.page || 1;
  const perPage = params?.perPage || 10;
  const offset = (page - 1) * perPage;

  const data = await db
    .select({
      id: productCategories.id,
      name: productCategories.name,
      createdAt: productCategories.createdAt,
      updatedAt: productCategories.updatedAt,
    })
    .from(productCategories)
    .where(ilike(productCategories.name, `%${params?.search || ''}%`))
    .limit(perPage)
    .offset(params?.search ? 0 : offset)
    .orderBy(asc(productCategories.name));

  const count = await db
    .select({ id: productCategories.id })
    .from(productCategories)
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

export const findOne = async (
  id: string
): Promise<TProductCategorySingleResponse> => {
  const data = await db
    .select({
      id: productCategories.id,
      name: productCategories.name,
      createdAt: productCategories.createdAt,
      updatedAt: productCategories.updatedAt,
    })
    .from(productCategories)
    .where(eq(productCategories.id, id))
    .then((data) => data?.at(0));
  return {
    data,
  };
};

export const create = async ({
  name,
}: TProductCategoryCreateRequest): Promise<TProductCategorySingleResponse> => {
  await db
    .insert(productCategories)
    .values({
      name,
    })
    .returning();
  return {
    message: 'Create Product category Success',
  };
};

export const update = async ({ id, name }: TProductCategoryUpdateRequest) => {
  await db
    .update(productCategories)
    .set({
      name,
    })
    .where(eq(productCategories.id, id as string))
    .returning();
  return {
    message: 'Update Product category Success',
  };
};

export const destroy = async (id: string) => {
  await db.delete(products).where(eq(products.id, id)).returning();
  return {
    message: 'Delete Product category Success',
  };
};
