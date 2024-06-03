import * as schema from '../schemas';

export const seedProduct = async (db: any) => {
  try {
    const products = await db
      .select({ id: schema.products.id })
      .from(schema.products);

    if (products.length > 0) {
      return;
    }
    const productDatas = [
      {
        name: 'Latte',
        productCategoryId: '1',
        priceSelling: 20000,
        image: '',
        description: '',
      },
    ];
    console.log('Seeding product... 🚀');

    await db.insert(schema.products).values(productDatas);

    console.log('Seeding product done! 🎊');
  } catch (error) {
    console.error('Error seeding product:', error);
  }
};
