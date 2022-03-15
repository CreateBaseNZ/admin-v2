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
  const input = { query: {}, option: {} };
  // Send request to the main backend
  const url1 = process.env.PREFIX_BACKEND + '/profile/retrieve';
  const input1 = { query: {}, option: { account: [] } };
  let data1;
  try {
    data1 = (await axios.post(url1, { ...keys, input: input1 }))['data'];
  } catch (error) {
    data1 = { status: 'error', content: error };
  }
  if (data1.status !== 'succeeded')
    return res.send({ status: 'error', content: data1.content });
  // Retrieve licenses
  const url2 = process.env.PREFIX_BACKEND + '/license/retrieve';
  let data2;
  try {
    data2 = (await axios.post(url2, { ...keys, input }))['data'];
  } catch (error) {
    data2 = { status: 'error', content: error };
  }
  if (data2.status !== 'succeeded') {
    if (data2.status !== 'failed') {
      return res.send({ status: 'error', content: data2.content });
    } else if (data2.content.licenses !== 'do not exist') {
      return res.send({ status: 'error', content: data2.content });
    }
  }
  // Retrieve groups
  const url3 = process.env.PREFIX_BACKEND + '/group/retrieve';
  let data3;
  try {
    data3 = (await axios.post(url3, { ...keys, input }))['data'];
  } catch (error) {
    data3 = { status: 'error', content: error };
  }
  if (data3.status !== 'succeeded') {
    if (data3.status !== 'failed') {
      return res.send({ status: 'error', content: data3.content });
    } else if (data3.content.groups !== 'do not exists') {
      return res.send({ status: 'error', content: data3.content });
    }
  }
  // For each license assign the group
  const licenses = [];
  for (let i = 0; i < data2.content.length; i++) {
    const license = convertToNormalObject(data2.content[i]);
    license.group = data3.content.find((group: any) => {
      return group._id.toString() == license.group.toString();
    });
    licenses.push(license);
  }
  // For each profile assign license
  const profiles = [];
  for (let j = 0; j < data1.content.length; j++) {
    const profile = convertToNormalObject(data1.content[j]);
    const profileLicenses = [];
    for (let k = 0; k < profile.licenses.length; k++) {
      const licenseId = profile.licenses[k];
      const license = licenses.find((element) => {
        return element._id.toString() == licenseId.toString();
      });
      profileLicenses.push(license);
    }
    profile.licenses = profileLicenses;
    profiles.push(profile);
  }
  // Success handler
  return res.send({ status: 'succeeded', content: profiles });
}

function convertToNormalObject(document: unknown) {
  return JSON.parse(JSON.stringify(document));
}
