import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { FC, ReactElement } from 'react';

export type TCardOverviewSingleResponse ={
    title: string;
    value: number;
    icon: string;
    status: {
        label: string;
        value: 'positive' | 'negative' | 'new-product';
    };
}

export const CardOverview: FC< {data: TCardOverviewSingleResponse[]}> = ({data}): ReactElement => {
    
  const iconClassName = (title: string) => clsx('p-1 rounded-md', {
    'text-info-500 bg-info-100': title === 'Order',
    'text-info-800 bg-info-100': title === 'Product',
    'text-success-500 bg-success-100': title === 'Completed Order',
    'text-warning-500 bg-warning-100': title === 'Pending Order',
  });
 

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data?.map((item, index) => (
        <div key={index} className="border-2 border-grey-100 rounded-md p-2 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <Icon icon={item.icon} width={24} className={iconClassName(item.title)} />
          </div>
          <div className="flex flex-col gap-y-2 mt-6">
            <h1 className="text-2xl font-bold">{item.value}</h1>
            <div className="flex gap-x-1 items-center">
              <Icon
                icon={
                    item.status.value === 'new-product'
                    ? 'material-symbols-light:upload'
                    : item.status.value === 'positive'
                    ? 'ph:trend-up-light'
                    : 'ph:trend-down-light'
                }
                width={12}
                className={
                    item.status.value === 'new-product'
                    ? 'text-info-800'
                    : item.status.value === 'positive'
                    ? 'text-success'
                    : 'text-error-600'
                }
              />
              <small
                className={
                    item.status.value === 'new-product'
                    ? 'text-info-800'
                    : item.status.value === 'positive'
                    ? 'text-success'
                    : 'text-error'
                }
              >
                {item.status.value === 'new-product'
                  ? item.status.label + ' New product'
                  : item.status.label + ' than Yesterday'}
              </small>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
