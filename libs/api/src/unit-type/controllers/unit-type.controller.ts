import { router, procedure } from '@fms/trpc-server';
import {
  createUnitType,
  deleteUnitType,
  findManyUnitType,
  findOneUnitType,
  updateUnitType,
} from '../services/unit-type.service';
import {
  unitTypeCreateSchema,
  unitTypeUpdateSchema,
  queryParamsSchema,
  dataResponseSchema,
  unitTypeSchema,
  dataSingleResponseSchema,
} from '@fms/entities';
export const unitTypeController = router({
  create: procedure
    .output(dataSingleResponseSchema(unitTypeSchema))
    .input(unitTypeCreateSchema)
    .mutation(async ({ input }) => {
      return await createUnitType(input);
    }),
  update: procedure
    .output(dataSingleResponseSchema(unitTypeSchema))
    .input(unitTypeUpdateSchema)
    .mutation(async ({ input }) => {
      return await updateUnitType(input);
    }),
  delete: procedure
    .output(dataSingleResponseSchema(unitTypeSchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await deleteUnitType(input);
    }),
  findMany: procedure
    .output(dataResponseSchema(unitTypeSchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findManyUnitType(input);
    }),
  findOne: procedure
    .output(dataSingleResponseSchema(unitTypeSchema))
    .input(queryParamsSchema)
    .query(async ({ input }) => {
      return await findOneUnitType(input);
    }),
});
