import { TCardOverviewSingleResponse } from "./modules/card-overview";

export const recapData: TCardOverviewSingleResponse[] = [
    {
      title: 'Order',
      value: 2,
      icon: 'gala:bag',
      status: {
        label: '+0.2%',
        value: 'positive',
      },
    },
    {
      title: 'Pending Order',
      value: 3,
      icon: 'material-symbols-light:pending-actions',
      status: {
        label: '-0.2%',
        value: 'negative',
      },
    },
    {
      title: 'Completed Order',
      value: 8,
      icon: 'mdi:coffee-maker-complete-outline',
      status: {
        label: '+0.3%',
        value: 'positive',
      },
    },
    {
      title: 'Product',
      value:5,
      icon: 'mdi:coffee-maker-outline',
      status: {
        label: '+2',
        value: 'new-product',
      },
    },
  ];