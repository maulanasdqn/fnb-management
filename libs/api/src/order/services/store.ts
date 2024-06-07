import { TOrderResponse, EOrderStatus } from '@fms/entities';

export const dummyData: TOrderResponse['data'] = [
  {
    id: '1',
    customer: { id: '1', name: 'Randika' },
    place: { id: '1', name: 'table 1' },
    payment: { id: '1', name: 'cash' },
    orderDetails: [
      {
        product: { id: '1', name: 'Vanilla Late' },
        quantity: 2,
        price: 15000,
      },
      {
        product: { id: '2', name: 'Americano' },
        quantity: 1,
        price: 15000,
      },
    ],
    amountTotal: 45000,
    invoiceNumber: 'INVOICE-001',
    status: EOrderStatus.ORDERED,
  },
  {
    id: '2',
    customer: { id: '2', name: 'Emip Sugiharto' },
    place: { id: '2', name: 'table 2' },
    payment: { id: '2', name: 'cashless' },
    orderDetails: [
      {
        product: { id: '3', name: 'Cofee Latte' },
        quantity: 1,
        price: 20000,
      },
    ],
    amountTotal: 20000,
    invoiceNumber: 'INVOICE-001',
    status: EOrderStatus.DELIVERED,
  },
  {
    id: '3',
    customer: { id: '3', name: 'Maulana' },
    place: { id: '3', name: 'table 3' },
    payment: { id: '3', name: 'cash' },
    orderDetails: [
      {
        product: { id: '4', name: 'Coffe Hazelnut' },
        quantity: 1,
        price: 15000,
      },
    ],
    amountTotal: 15000,
    invoiceNumber: 'INVOICE-001',
    status: EOrderStatus.PROCESSING,
  },
];
