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

export default function GearingChart({
  gears,
  idleRPM,
  maxRPM,
  vmax,
}: {
  gears: VehiclesPlaceDataVehicleDriveDataMetrics['gears']['forward'];
  idleRPM: number;
  maxRPM: number;
  vmax: number;
}) {
  // topKmh is the speed at maxRPM, so rpm is linear in speed within a gear.
  const rpmAt = (kmh: number, topKmh: number) => (maxRPM * kmh) / topKmh;
  const idleKmh = (topKmh: number) =>
    Math.round((topKmh * idleRPM * 10) / maxRPM) / 10;

  const speeds = speedGrid(
    Math.max(...gears.map((gear) => gear.topKmh)),
    gears.flatMap((gear) => [idleKmh(gear.topKmh), gear.topKmh]),
  );

  const data = speeds.map((kmh) => {
    const row: Record<string, number | null> = { kmh };

    for (const gear of gears) {
      const inRange =
        kmh >= idleKmh(gear.topKmh) - 1e-6 && kmh <= gear.topKmh + 1e-6;

      row[`gear${gear.gear}`] = inRange
        ? Math.round(rpmAt(kmh, gear.topKmh))
        : null;
    }

    return row;
  });

  const chart = useChart({ data, series: gearSeries(gears) });

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
          domain={[0, maxRPM]}
          stroke={chart.color('border')}
          tickLine={false}
          tickMargin={10}
          width={72}
          label={{
            angle: -90,
            fill: chart.color('fg.muted'),
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
            value: 'Engine speed (RPM)',
          }}
        />

        <Tooltip
          animationDuration={100}
          content={
            <Chart.Tooltip
              formatter={(value: number, name: string) => [
                ` ${value} RPM`,
                name,
              ]}
              labelFormatter={(label) => `${label} km/h`}
            />
          }
          cursor={false}
        />

        <ReferenceLine
          stroke={chart.color('border.emphasized')}
          strokeDasharray="4 4"
          y={idleRPM}
          label={{
            fill: chart.color('fg.muted'),
            position: 'right',
            value: 'Idle',
          }}
        />

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
