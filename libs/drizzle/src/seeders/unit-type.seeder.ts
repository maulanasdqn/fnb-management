import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schemas';

//Redeclare because canot import enum from entities
export enum EUnitType {
  KILOGRAM = 'Kilogram',
  GRAM = 'Gram',
  LITER = 'Liter',
  MILLILITER = 'Milliliter',
  OUNCE = 'Ounce',
  GALLON = 'Gallon',
  CUP = 'Cup',
}
export const seedUnitType = async <T extends Record<string, unknown>>(
  db: NodePgDatabase<T>
) => {
  try {
    const unitConversionExist = await db
      .select({ id: schema.unitConversions.id })
      .from(schema.unitConversions);

    if (unitConversionExist.length > 0) {
      return;
    }

    console.log('Seeding unit type... 🚀');

    const unitMap: Record<string, string> = {};
    const unitTypes = Object.values(EUnitType).map((unitType) => ({
      name: unitType,
    }));

    const unitConversions = [
      {
        fromUnitName: EUnitType.KILOGRAM,
        toUnitName: EUnitType.GRAM,
        conversionFactor: 1000,
      },
      {
        fromUnitName: EUnitType.KILOGRAM,
        toUnitName: EUnitType.OUNCE,
        conversionFactor: 35.274,
      },
      {
        fromUnitName: EUnitType.GRAM,
        toUnitName: EUnitType.KILOGRAM,
        conversionFactor: 0.001,
      },
      {
        fromUnitName: EUnitType.GRAM,
        toUnitName: EUnitType.OUNCE,
        conversionFactor: 0.035274,
      },
      {
        fromUnitName: EUnitType.LITER,
        toUnitName: EUnitType.MILLILITER,
        conversionFactor: 1000,
      },
      {
        fromUnitName: EUnitType.LITER,
        toUnitName: EUnitType.GALLON,
        conversionFactor: 0.264172,
      },
      {
        fromUnitName: EUnitType.LITER,
        toUnitName: EUnitType.CUP,
        conversionFactor: 4.22675,
      },
      {
        fromUnitName: EUnitType.MILLILITER,
        toUnitName: EUnitType.LITER,
        conversionFactor: 0.001,
      },
      {
        fromUnitName: EUnitType.OUNCE,
        toUnitName: EUnitType.KILOGRAM,
        conversionFactor: 0.0283495,
      },
      {
        fromUnitName: EUnitType.OUNCE,
        toUnitName: EUnitType.GRAM,
        conversionFactor: 28.3495,
      },
      {
        fromUnitName: EUnitType.GALLON,
        toUnitName: EUnitType.LITER,
        conversionFactor: 3.78541,
      },
      {
        fromUnitName: EUnitType.CUP,
        toUnitName: EUnitType.LITER,
        conversionFactor: 0.236588,
      },
    ];
    await db.insert(schema.unitTypes).values(unitTypes);
    await db.transaction(async (tx) => {
      for (const unitType of unitTypes) {
        const createdUnit = await tx
          .insert(schema.unitTypes)
          .values({
            name: unitType.name,
          })
          .returning()
          .then((res) => res[0]);

        unitMap[unitType.name] = createdUnit.id;
      }
      for (const conversion of unitConversions) {
        await tx.insert(schema.unitConversions).values({
          fromUnitId: unitMap[conversion.fromUnitName],
          toUnitId: unitMap[conversion.toUnitName],
          conversionFactor: conversion.conversionFactor,
        });
      }
    });
    console.log('Seeding unit type done! 🎊');
  } catch (error) {
    console.error('Error seeding unit type:', error);
  }
};
