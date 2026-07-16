import { Chart, useChart } from '@chakra-ui/charts';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function AccelerationChart({
  curve,
  intervalSeconds,
}: {
  curve: number[];
  intervalSeconds: number;
}) {
  const chart = useChart({
    data: curve.map((kmh, index) => ({
      kmh,
      seconds: Number(((index + 1) * intervalSeconds).toFixed(2)),
    })),
    series: [{ color: 'blue.solid', label: 'Speed', name: 'kmh' }],
  });

  return (
    <Chart.Root chart={chart} maxHeight="2xs">
      <LineChart data={chart.data} responsive>
        <CartesianGrid stroke={chart.color('border')} vertical={false} />

        <XAxis
          axisLine={false}
          dataKey={chart.key('seconds')}
          domain={[0, 'dataMax']}
          height={40}
          stroke={chart.color('border')}
          tickFormatter={(value) => `${value}s`}
          tickLine={false}
          type="number"
          label={{
            fill: chart.color('fg.muted'),
            position: 'insideBottom',
            value: 'Time from standstill',
          }}
        />
        <YAxis
          axisLine={false}
          stroke={chart.color('border')}
          tickFormatter={(value) => `${value}`}
          tickLine={false}
          tickMargin={10}
          width={64}
          label={{
            angle: -90,
            fill: chart.color('fg.muted'),
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
            value: 'Speed (km/h)',
          }}
        />

        <Tooltip
          animationDuration={100}
          content={
            <Chart.Tooltip
              formatter={(value: number) => [` ${value} km/h`, 'Speed']}
              labelFormatter={(label) => `${label}s`}
            />
          }
          cursor={false}
        />

        {chart.series.map((item) => (
          <Line
            key={item.name}
            dataKey={chart.key(item.name)}
            dot={false}
            isAnimationActive={false}
            stroke={chart.color(item.color)}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
}
