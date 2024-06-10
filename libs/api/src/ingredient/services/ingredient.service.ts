import { db, ingredients, unitConversions } from '@fms/drizzle';
import {
  TIngredientCreateRequest,
  TIngredientResponse,
  TIngredientSingleResponse,
  TIngredientUpdateRequest,
} from '@fms/entities';
import { and, eq, or } from 'drizzle-orm';

export const ingredientService = {
  findMany: async (id: string) => {
    const dataUnitConversions = await db.query.unitConversions.findMany({
      columns: {
        id: true,
        conversionFactor: true,
      },
      with: {
        fromUnit: {
          columns: {
            id: true,
            name: true,
          },
        },
        toUnit: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    const data = await db.query.ingredients.findMany({
      columns: {
        id: true,
        name: true,
        price: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        unitType: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!data || data.length === 0) {
      throw new Error('Ingredients not found');
    }

    const response = data.map((ingredient) => {
      const stockInBaseUnit = ingredient.amount;
      const baseUnitName = ingredient.unitType.name;

      const stock = { [baseUnitName]: stockInBaseUnit };

      for (const conversion of dataUnitConversions) {
        if (conversion.fromUnit.name === ingredient.unitType.name) {
          stock[conversion.toUnit.name] =
            stockInBaseUnit * conversion.conversionFactor;
        } else if (conversion.toUnit.name === ingredient.unitType.name) {
          stock[conversion.fromUnit.name] =
            stockInBaseUnit / conversion.conversionFactor;
        }
      }

      return {
        id: ingredient.id,
        name: ingredient.name,
        price: ingredient.price,
        amount: ingredient.amount,
        createdAt: ingredient.createdAt,
        updatedAt: ingredient.updatedAt,
        stock,
      };
    });

    return response;
  },
  findOne: async (id: string): Promise<TIngredientSingleResponse> => {
    const data = await db.query.ingredients.findFirst({
      where: eq(ingredients.id, id),
      columns: {
        id: true,
        name: true,
        price: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        unitType: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!data) {
      throw new Error('Ingredient not found');
    }

    const dataUnitConversions = await db.query.unitConversions.findMany({
      columns: {
        id: true,
        conversionFactor: true,
      },
      with: {
        fromUnit: {
          columns: {
            id: true,
            name: true,
          },
        },
        toUnit: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    const stockInBaseUnit = data.amount;
    const baseUnitName = data.unitType.name;

    const stock = { [baseUnitName]: stockInBaseUnit };

    for (const conversion of dataUnitConversions) {
      if (conversion.fromUnit.name === data.unitType.name) {
        stock[conversion.toUnit.name] =
          stockInBaseUnit * conversion.conversionFactor;
      } else if (conversion.toUnit.name === data.unitType.name) {
        stock[conversion.fromUnit.name] =
          stockInBaseUnit / conversion.conversionFactor;
      }
    }

    return {
      data: {
        id: data.id,
        name: data.name,
        price: data.price,
        amount: data.amount,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        stock,
      },
    };
  },
  create: async (
    data: TIngredientCreateRequest
  ): Promise<{ message: string }> => {
    await db.insert(ingredients).values({
      name: data.name,
      price: data.price,
      amount: data.amount,
      unitTypeId: data.unitTypeId,
    });
    return {
      message: 'Create ingrdient Success',
    };
  },
  delete: async (id: string): Promise<{ message: string }> => {
    await db.delete(ingredients).where(eq(ingredients.id, id));
    return {
      message: 'Delete Ingredient Success',
    };
  },
  update: async (
    data: TIngredientUpdateRequest
  ): Promise<{ message: string }> => {
    await db.update(ingredients).set(data).where(eq(ingredients.id, data.id));
    return {
      message: 'Update Ingredient Success',
    };
  },
};
