import { Chart, useChart } from '@chakra-ui/charts';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  CHART_MARGIN,
  gearSeries,
  speedGrid,
} from '@/components/features/vehicles/vehicle/dynamic/modules/gearing/shared';

import type { VehiclesPlaceDataVehicleDriveDataMetrics } from '@generated/vehicles';

type Points =
  VehiclesPlaceDataVehicleDriveDataMetrics['tractiveEffort']['gears'][number]['points'];

function pullAt(points: Points, kmh: number) {
  const last = points[points.length - 1];
  if (kmh < points[0].kmh || kmh > last.kmh) return null;

  const index = points.findIndex((point) => point.kmh >= kmh);
  const high = points[index];
  if (index === 0 || high.kmh === kmh) return high.teOverWeight;

  const low = points[index - 1];
  const ratio = (kmh - low.kmh) / (high.kmh - low.kmh);
  const value =
    low.teOverWeight + ratio * (high.teOverWeight - low.teOverWeight);

  return Math.round(value * 1000) / 1000;
}

export default function TractiveEffortChart({
  stepless,
  tractiveEffort,
  vmax,
}: {
  stepless: boolean;
  tractiveEffort: VehiclesPlaceDataVehicleDriveDataMetrics['tractiveEffort'];
  vmax: number;
}) {
  const { gears, gradeDemands } = tractiveEffort;

  const speeds = speedGrid(
    Math.max(...gears.map((gear) => gear.points[gear.points.length - 1].kmh)),
    gears.flatMap((gear) => gear.points.map((point) => point.kmh)),
  );

  const data = speeds.map((kmh) => {
    const row: Record<string, number | null> = { kmh };

    for (const gear of gears) {
      row[`gear${gear.gear}`] = pullAt(gear.points, kmh);
    }

    return row;
  });

  const chart = useChart({ data, series: gearSeries(gears, stepless) });

  return (
    <Chart.Root chart={chart} maxHeight="2xs">
      <LineChart data={chart.data} margin={CHART_MARGIN} responsive>
        <CartesianGrid stroke={chart.color('border')} vertical={false} />

        <XAxis
          axisLine={false}
          dataKey={chart.key('kmh')}
          domain={[0, 'dataMax']}
          height={40}
          stroke={chart.color('border')}
          tickLine={false}
          type="number"
          label={{
            fill: chart.color('fg.muted'),
            position: 'insideBottom',
            value: 'Speed (km/h)',
          }}
        />

        <YAxis
          axisLine={false}
          stroke={chart.color('border')}
          tickLine={false}
          tickMargin={10}
          width={72}
          label={{
            angle: -90,
            fill: chart.color('fg.muted'),
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
            value: 'Pull (× weight)',
          }}
        />

        <Tooltip
          animationDuration={100}
          content={
            <Chart.Tooltip
              formatter={(value: number, name: string) => [` ${value}`, name]}
              labelFormatter={(label) => `${label} km/h`}
            />
          }
          cursor={false}
        />

        {gradeDemands.map((demand) => (
          <ReferenceLine
            key={demand.gradePercent}
            stroke={chart.color('border.emphasized')}
            strokeDasharray="4 4"
            y={demand.teOverWeight}
            label={{
              fill: chart.color('fg.muted'),
              position: 'right',
              value: `${demand.gradePercent}%`,
            }}
          />
        ))}

        <ReferenceLine
          stroke={chart.color('fg.muted')}
          strokeDasharray="2 2"
          x={vmax}
          label={{
            fill: chart.color('fg.muted'),
            position: 'top',
            value: 'Vmax',
          }}
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
          />
        ))}
      </LineChart>
    </Chart.Root>
  );
}
