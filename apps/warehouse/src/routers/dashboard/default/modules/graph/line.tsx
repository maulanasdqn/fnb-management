import React, { memo, useMemo } from 'react';
import { FC, ReactElement } from 'react';
import {
  LineChart,
  Line,
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
type TDataLineGraph = {
  name: string;
  kopiSusu: number;
  kopiTeh: number;
  kopiCappucino: number;
}
const LineGraphMemoized = memo(
  ({ data }: { data: TDataLineGraph[]}): ReactElement => (
    
      <ResponsiveContainer width={'100%'} height={300}>
        <LineChart
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
          <XAxis dataKey="name" fontSize={12} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            content={<CustomToolTip active={false} payload={[]} label={''} />}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="kopiSusu"
            stroke="#FFA732"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="kopiTeh"
            stroke="#EF4040"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="kopiCappucino"
            stroke="#22b6b9"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
  )
);

export const LineGraph: FC = memo((): ReactElement => {
  const data = useMemo(
    () => [
      { name: 'Senin', kopiSusu: 40, kopiTeh: 20, kopiCappucino: 30 },
      { name: 'Selasa', kopiSusu: 30, kopiTeh: 10, kopiCappucino: 20 },
      { name: 'Rabu', kopiSusu: 20, kopiTeh: 21, kopiCappucino: 10 },
      { name: 'Kamis', kopiSusu: 10, kopiTeh: 25, kopiCappucino: 30 },
      { name: 'Jumat', kopiSusu: 20, kopiTeh: 20, kopiCappucino: 22 },
      { name: 'Sabtu', kopiSusu: 30, kopiTeh: 10, kopiCappucino: 20 },
      { name: 'Minggu', kopiSusu: 20, kopiTeh: 30, kopiCappucino: 10 },
    ],
    []
  );

  return <LineGraphMemoized data={data} />;
});
