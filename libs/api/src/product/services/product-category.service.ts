import { db, productCategories } from '@fms/drizzle';
import { asc } from 'drizzle-orm';
export const findManyProductCategory = async () => {
  return await db
    .select()
    .from(productCategories)
    .orderBy(asc(productCategories.name));
};

export const findOneByIdProductCategory = async () => {
  return;
};

export const createProductCategory = async () => {
  return;
};
export const updateProductCategory = async () => {
  return;
};
