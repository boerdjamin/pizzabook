import { Identifyable } from './../models/identifyable';
import { FieldSet, Table } from 'airtable';
import { handleError } from './error-util';

export const fetchDataFromAirtable = <T extends Identifyable>(
  table: Table<FieldSet>,
  validationFn: (value: any) => boolean,
  updateFn: (allEntries: T[]) => void,
) => {
  table
    .select({
      maxRecords: 50,
      view: 'Grid view',
    })
    .eachPage((records, fetchNextPage) => {
      const allEntries = records.reduce<T[]>((collection, record) => {
        const newData = record.fields;
        const isValid = validationFn(newData);

        // delete invalid entries
        if (!isValid) {
          // table.destroy(record.id);
          return collection;
        }

        return [...collection, { id: record.id, ...newData } as T];
      }, []);

      updateFn(allEntries);
      fetchNextPage();
    }, handleError);
};
