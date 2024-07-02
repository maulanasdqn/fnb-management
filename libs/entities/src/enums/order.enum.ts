export enum EOrderStatus {
  ORDERRECEIVED = 'Order Received',
  ORDERCONFIRMED = 'Order Confirmed',
  SERVED = 'Served',
  COMPLETED = 'Completed',
  CANCELED = 'Cancelled',
  REFUNDED = 'Refunded',
  INQUEUE = 'In Queue',
  ONHOLD = 'On Hold',
}

export enum EOrderType {
  DINEIN = 'Dine In',
  TAKEAWAY = 'Take Away',
}
