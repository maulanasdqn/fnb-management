import { FC, ReactElement } from 'react';

interface Product {
  name: string;
  date: string;
  price: string;
  quantity: number;
  amount: string;
}

const products: Product[] = [
  { name: 'Kopi Susu Banana', date: '06 April 2018', price: 'Rp. 18000', quantity: 42, amount: 'Rp. 220.000' },
  { name: 'Kopi Susu Brown Sugar', date: '15 March 2018', price: 'Rp. 15000', quantity: 33, amount: 'Rp. 220.000' },
  { name: 'Kopi Susu chocolate', date: '10 March 2018', price: 'Rp. 18000', quantity: 25, amount: 'Rp. 200.000' },
  { name: 'Americanno', date: '21 May 2018', price: 'Rp. 13000', quantity: 10, amount: 'Rp. 100.000' },
  { name: 'Kopi Susu rose', date: '10 April 2018', price: 'Rp. 18000', quantity: 8, amount: 'Rp. 150.000' },
];

export const TableOverview: FC = ():ReactElement => {
  const TableRow = ({ product }: { product: Product }) => (
    <tr key={product.name}>
      <td className="px-3 py-4 border-b border-grey-200 bg-white text-sm">
        {product.name}
      </td>
      <td className="px-3 py-4 border-b border-grey-200 bg-white text-sm">
        {product.date}
      </td>
      <td className="px-3 py-4 border-b border-grey-200 bg-white text-sm">
        {product.price}
      </td>
      <td className="px-3 py-4 border-b border-grey-200 bg-white text-sm text-center">
        {product.quantity}
      </td>
      <td className="px-3 py-4 border-b border-grey-200 bg-white text-sm">
        {product.amount}
      </td>
    </tr>
  );

  return (
    <div className="bg-white text-grey-600 p-2 rounded-lg shadow-md ">
      <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full leading-normal">
        <thead>
            <tr className="bg-grey-100">
              <th className="px-3 py-2 border-b-2 border-grey-400 text-left text-xs font-semibold text-grey-300 uppercase tracking-wider">
                Nama Produk
              </th>
              <th className="px-3 py-2 border-b-2 border-grey-400 text-left text-xs font-semibold text-grey-300 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-3 py-2 border-b-2 border-grey-400 text-left text-xs font-semibold text-grey-300 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-3 py-2 border-b-2 border-grey-400 text-left text-xs font-semibold text-grey-300 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-3 py-2 border-b-2 border-grey-400 text-left text-xs font-semibold text-grey-300 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <TableRow product={product} key={index}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
