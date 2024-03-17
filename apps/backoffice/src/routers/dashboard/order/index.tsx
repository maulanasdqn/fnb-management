import { trpc } from '@fms/web-services';
import { Button } from '@fms/atoms';
import { FC, ReactElement } from 'react';

export const DashboardOrder: FC = (): ReactElement => {
  const { mutate, data } = trpc.order.hello.useMutation();

  const handleClick = () => {
    mutate({
      name: 'John Doe',
    });
  };

  console.log(data);

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <h1 className="text-3xl font-bold">Order</h1>
      <div className="w-full flex justify-start">
        <div className="grid grid-rows-2 grid-cols-4 gap-4 mt-6 w-full max-w-[854px] items-center">
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg p-4 flex justify-center items-end">
            <div className="flex flex-col items-center h-full w-full">
              <h1 className="text-lg">Order ID</h1>
            </div>
            <Button onClick={handleClick}>Complete Order</Button>
          </div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
          <div className="shadow-md bg-white w-[200px] h-[200px] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
