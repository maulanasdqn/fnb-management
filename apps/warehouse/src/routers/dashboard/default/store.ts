import { TCardOverviewSingleResponse } from "./modules/card-overview";

export const recapData: TCardOverviewSingleResponse[] = [
    {
      title: 'Total Order',
      value: 200,
      icon: 'gala:bag',
      status: {
        label: '+0.2%',
        value: 'positive',
      },
    },
    {
      title: 'Total Pending Order',
      value: 10,
      icon: 'material-symbols-light:pending-actions',
      status: {
        label: '-0.2%',
        value: 'negative',
      },
    },
    {
      title: 'Total Completed Order',
      value: 210,
      icon: 'mdi:coffee-maker-complete-outline',
      status: {
        label: '+0.3%',
        value: 'positive',
      },
    },
    {
      title: 'Total Product',
      value: 18,
      icon: 'mdi:coffee-maker-outline',
      status: {
        label: '+2',
        value: 'new-product',
      },
    },
  ];