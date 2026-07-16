import { Chart, useChart } from '@chakra-ui/charts';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { VehiclesPlaceDataVehicleDriveDataMetrics } from '@generated/vehicles';

const POWER_LABEL = 'Power';
const TORQUE_LABEL = 'Torque';

export default function EngineChart({
  idleRPM,
  points,
}: {
  idleRPM: number;
  points: VehiclesPlaceDataVehicleDriveDataMetrics['engine']['points'];
}) {
  const chart = useChart({
    data: points.filter((point) => point.rpm >= idleRPM),
    series: [
      {
        color: 'blue.solid',
        label: POWER_LABEL,
        name: 'powerHp',
        yAxisId: 'power',
      },
      {
        color: 'orange.solid',
        label: TORQUE_LABEL,
        name: 'torqueNm',
        yAxisId: 'torque',
      },
    ],
  });

  return (
    <Chart.Root chart={chart} maxHeight="2xs">
      <LineChart
        data={chart.data}
        margin={{ bottom: 0, left: 0, right: 0, top: 20 }}
        responsive
      >
        <CartesianGrid stroke={chart.color('border')} vertical={false} />

        <XAxis
          axisLine={false}
          dataKey={chart.key('rpm')}
          domain={['dataMin', 'dataMax']}
          height={40}
          stroke={chart.color('border')}
          tickLine={false}
          type="number"
          label={{
            fill: chart.color('fg.muted'),
            position: 'insideBottom',
            value: 'Engine speed (RPM)',
          }}
        />
        <YAxis
          axisLine={false}
          stroke={chart.color('border')}
          tickLine={false}
          tickMargin={10}
          width={64}
          yAxisId="power"
          label={{
            angle: -90,
            fill: chart.color('fg.muted'),
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
            value: 'Power (hp)',
          }}
        />
        <YAxis
          axisLine={false}
          orientation="right"
          stroke={chart.color('border')}
          tickLine={false}
          tickMargin={10}
          width={72}
          yAxisId="torque"
          label={{
            angle: 90,
            fill: chart.color('fg.muted'),
            position: 'insideRight',
            style: { textAnchor: 'middle' },
            value: 'Torque (Nm)',
          }}
        />

        <Tooltip
          animationDuration={100}
          content={
            <Chart.Tooltip
              formatter={(value: number, name: string) =>
                name === TORQUE_LABEL
                  ? [` ${value} Nm`, name]
                  : [` ${value} hp`, name]
              }
              labelFormatter={(label) => `${label} RPM`}
            />
          }
          cursor={false}
        />

        <Legend content={<Chart.Legend />} />

        {chart.series.map((item) => (
          <Line
            key={item.name}
            dataKey={chart.key(item.name)}
            dot={false}
            isAnimationActive={false}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            yAxisId={item.yAxisId}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
}
