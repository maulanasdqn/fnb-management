import {
  db,
  products,
  productCategories,
  productVariants,
  variantOptions,
  variants,
} from '@fms/drizzle';
import {
  TProductCreateRequest,
  TProductUpdateRequest,
  TProductResponse,
  TQueryParams,
  TProductSingleResponse,
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
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
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
      category: {
        id: productCategories.id,
        name: productCategories.name,
      },
      description: products.description,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .leftJoin(
      productCategories,
      eq(productCategories.id, products.productCategoryId)
    )
    .where(eq(products.id, id))
    .then((data) => data?.at(0));

  const variantProduct = await db
    .select({
      id: variants.id,
      name: variants.name,
      option: {
        id: variantOptions.id,
        name: variantOptions.name,
      },
    })
    .from(variants)
    .leftJoin(variantOptions, eq(variantOptions.variantId, variants.id))
    .leftJoin(
      productVariants,
      eq(productVariants.variantOptionId, variantOptions.id)
    )
    .leftJoin(products, eq(products.id, productVariants.productId))
    .where(eq(productVariants.productId, id));

  return {
    data,
  };
};

export const create = async ({
  name,
  priceSelling,
  productCategoryId,
  image,
  description,
}: TProductCreateRequest): Promise<TProductSingleResponse> => {
  await db
    .insert(products)
    .values({
      name,
      priceSelling,
      productCategoryId,
      image,
      description,
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
  image,
  description,
}: TProductUpdateRequest) => {
  await db
    .update(products)
    .set({
      name,
      priceSelling,
      image,
      description,
    })
    .where(eq(products.id, id as string))
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
