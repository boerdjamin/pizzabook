import Airtable from 'airtable';

export const base = new Airtable({
  apiKey: process.env.API_KEY || 'keykb1oz1auGVmkhc',
}).base(process.env.APP_ID || 'appLab4MMkQeWEMT7');
