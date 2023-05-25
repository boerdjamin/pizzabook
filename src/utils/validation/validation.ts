import { FieldSet } from 'airtable';

export const isAirtableDataValid = <T extends FieldSet>(
  data: FieldSet,
  keyCheck: { all: (keyof T)[]; required: (keyof T)[] },
): data is T => {
  const keys = Object.keys(data) as (keyof T)[];

  // has all required attributes
  const hasAllRequiredProps = keyCheck.required.every(requiredKey => {
    const found = keys.includes(requiredKey);
    if (!found)
      console.warn(`required key ${requiredKey.toString()} is missing!`);

    return found;
  });

  // all attributes belong to interface T
  const allKeysValid = keys.every(key => {
    const found = keyCheck.all.includes(key);
    if (!found) console.warn(`unknown key "${key.toString()}"`);
    return found;
  });

  return hasAllRequiredProps && allKeysValid;
};
