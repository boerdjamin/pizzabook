export const isAirtableDataValid = <T>(
  data: any,
  keyCheck: { all: (keyof T)[]; required: (keyof T)[] },
): data is T => {
  const keys = Object.keys(data) as (keyof T)[];

  return (
    // has all required attributes
    keyCheck.required.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface T
    keys.every(key => keyCheck.all.includes(key))
  );
};
