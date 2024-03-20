import { router, procedure } from '@fms/trpc-server';
import { productResponseSchema } from '@fms/entities';
import { z } from 'zod';

export const productController = router({
  findMany: procedure
    .output(productResponseSchema.array())
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(({ input }) => {
      const data = [
        {
          id: '1',
          name: 'Kopi Capucino',
          priceSelling: 20000,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
          description: 'Kopi',
        },
        {
          id: '2',
          name: 'Kopi Latte',
          priceSelling: 20000,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
          description: 'Kopi',
        },
        {
          id: '3',
          name: 'Kopi Americano',
          priceSelling: 20000,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
          description: 'Kopi',
        },
        {
          id: '4',
          name: 'Kopi Bubuk',
          priceSelling: 20000,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
          description: 'Kopi',
        },
        {
          id: '5',
          name: 'Kopi Kopihitam',
          priceSelling: 20000,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
          description: 'Kopi',
        },
      ];

      return data.filter((item) => item.name.includes(input.search));
    }),
});
