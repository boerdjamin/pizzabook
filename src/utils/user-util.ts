import { AirtableUser } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredAirtableUserKeys: Array<RequiredPropertyOf<AirtableUser>> =
  ['name'];

export const airtableUserKeys: Array<keyof AirtableUser> = ['name', 'pizzas'];

export const isAirtableUserFromDBValid = (
  val: AirtableUser | any,
): val is AirtableUser => {
  const possibleAirtableUser = val as AirtableUser;
  const keys = Object.keys(possibleAirtableUser);

  return (
    // has all required attributes
    requiredAirtableUserKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'AirtableUser'
    keys.every(key => (airtableUserKeys as string[]).includes(key))
  );
};
