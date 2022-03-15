import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  status: string;
  content: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') return;
  // Initialise API Keys and URL
  const keys = { API_KEY_PRIVATE: process.env.API_KEY_PRIVATE };
  const url = process.env.PREFIX_API + '/tracking/retrieve';
  // Send request
  const input = {};
  let data;
  try {
    data = (await axios.post(url, { ...keys, input }))['data'];
  } catch (error) {
    return res.send({ status: 'failed', content: error });
  }
  // Success handler
  return res.send({ status: 'succeeded', content: data.content });
}
