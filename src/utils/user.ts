import { AirtableUser } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredUserKeys: Array<RequiredPropertyOf<AirtableUser>> = [
  'name',
];

export const userKeys: Array<keyof AirtableUser> = ['name', 'picture'];
