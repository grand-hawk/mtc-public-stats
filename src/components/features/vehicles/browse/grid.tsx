import { Box } from '@chakra-ui/react';
import React from 'react';

import VehicleCard from '@/components/features/vehicles/browse/card';

import type { ListVehicle } from '@/server/api/trpc/routers/vehicles';

const GRID_GAP = 12;
const MIN_CARD_WIDTH_PX = 260;
const MAX_COLUMNS = 4;

// minmax(max(min-width, calc(...)), 1fr) caps auto-fill at MAX_COLUMNS
const COLUMN_TEMPLATE = `repeat(auto-fill, minmax(max(${MIN_CARD_WIDTH_PX}px, calc(${
  100 / MAX_COLUMNS
}% - ${(GRID_GAP * (MAX_COLUMNS - 1)) / MAX_COLUMNS}px)), 1fr))`;

export default function VehicleGrid({
  placeInitials,
  vehicles,
}: {
  placeInitials: string;
  vehicles: ListVehicle[];
}) {
  return (
    <Box
      flex={1}
      overflowY="auto"
      paddingBottom={5}
      paddingTop={4}
      paddingX={{ base: 4, md: 5 }}
    >
      <Box
        display="grid"
        gap={`${GRID_GAP}px`}
        style={{ gridTemplateColumns: COLUMN_TEMPLATE }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.slug}
            href={`/${placeInitials}/vehicles/${vehicle.slug}`}
            isNew={vehicle.new}
            name={vehicle.name}
            premium={vehicle.premium}
            role={vehicle.role}
            slug={vehicle.slug}
            team={vehicle.team}
          />
        ))}
      </Box>
    </Box>
  );
}
