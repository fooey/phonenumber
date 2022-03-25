// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'types/api';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Data>>) {
  const response = {
    success: true,
    data: { name: 'John Doe' },
  };

  res.status(200).json(response);
}
