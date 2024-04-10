import React from 'react';
import { FC, ReactElement } from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CustomToolTip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: { value: number }[];
  label: string;
}) =>
  active && payload && payload.length ? (
    <div className="bg-opacity-25 bg-white bg-blur rounded-lg shadow-lg border border-white border-opacity-25 p-6">
      <p className="text-grey-800  font-bold">{label}</p>
      {payload.map(({ value }, index) => (
        <p key={index} className="text-grey-800 ">
          {['Kopi Susu', 'Kopi Teh', 'Kopi Cappucino'][index]}: {value}
        </p>
      ))}
    </div>
  ) : null;

const AreaGraphMemoized = React.memo(
  ({ data }: { data: typeof data }): ReactElement => (
    <section className="w-full h-72 bg-white rounded shadow-md">
      <ResponsiveContainer width={'100%'} height={'100%'} aspect={2 / 1}>
        <AreaChart
          width={400}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: -25,
            bottom: 5,
          }}
        >
          <YAxis fontSize={12} />
          <XAxis dataKey="name" alphabetic={'small'} fontSize={12} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            content={<CustomToolTip active={false} payload={[]} label={''} />}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="kopiSusu"
            stroke="#FFA732"
            fill="#FFA732"
            fillOpacity={0.5}
            stackId={'1'}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="kopiTeh"
            stroke="#EF4040"
            fill="#EF4040"
            fillOpacity={0.5}
            stackId={'1'}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="kopiCappucino"
            stroke="#C21292"
            fill="#C21292"
            fillOpacity={0.5}
            stackId={'1'}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
);

export const AreaGraph: FC = React.memo((): ReactElement => {
  const data = React.useMemo(
    () => [
      { name: 'Senin', kopiSusu: 40, kopiTeh: 20, kopiCappucino: 20 },
      { name: 'Selasa', kopiSusu: 30, kopiTeh: 10, kopiCappucino: 20 },
      { name: 'Rabu', kopiSusu: 20, kopiTeh: 21, kopiCappucino: 10 },
      { name: 'Kamis', kopiSusu: 10, kopiTeh: 25, kopiCappucino: 30 },
      { name: 'Jumat', kopiSusu: 20, kopiTeh: 20, kopiCappucino: 22 },
      { name: 'Sabtu', kopiSusu: 30, kopiTeh: 10, kopiCappucino: 20 },
      { name: 'Minggu', kopiSusu: 20, kopiTeh: 30, kopiCappucino: 10 },
    ],
    []
  );

  return <AreaGraphMemoized data={data} />;
});
