import { FC, ReactElement } from 'react';

export const RecipeOrder: FC = (): ReactElement => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Resep Produk Per Item</h1>
      <div className="flex md:flex-row flex-col">
        <img
          className="w-1/2 p-4"
          src="/asset1.jpg"
          alt="cofee"
          width={600}
          height={600}
        />
        <div className="flex flex-col">
          <p className="pt-4">Resep :</p>
          {/* List Array bahan */}
          <li>100 ml Susu</li>
          <li>100 ml Kopi</li>
          <li>200 gram Gula</li>
        </div>
      </div>
    </div>
  );
};
