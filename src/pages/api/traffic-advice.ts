import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('content-type', 'application/traffic-advice');
  res.status(200).send(
    JSON.stringify([{ user_agent: 'prefetch-proxy', fraction: 1.0 }]),
  );
}
