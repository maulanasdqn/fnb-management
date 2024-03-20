import { router, procedure } from '@fms/trpc-server';


export const productController = router({
  findMany: procedure
    .query(() => {
        return [
          {
            id:"1",
            name :"Kopi",
            priceSelling :20000,
            image:"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
            description : "Kopi",
        },
        {
          id:"2",
          name :"Kopi",
          priceSelling :20000,
          image:"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
          description : "Kopi",
      },
      {
        id:"3",
        name :"Kopi",
        priceSelling :20000,
        image:"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
        description : "Kopi",
    },
    {
      id:"4",
      name :"Kopi",
      priceSelling :20000,
      image:"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
      description : "Kopi",
  },
  {
    id:"5",
    name :"Kopi",
    priceSelling :20000,
    image:"https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
    description : "Kopi",
}
          
        ]
    })
});
