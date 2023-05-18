import * as React from 'react';

import CreateUserComponent from './create-user-component';
import { base } from '../../../airtable';

interface CreateUserScreenProps {}

const CreateUserScreen: React.FC<CreateUserScreenProps> = () => {
  const onCreateUser = (name: string) => {
    base('Users').create([{ fields: { name } }], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      if (records) {
        records.forEach(record => {
          console.log(record.getId());
        });
      }
    });
  };
  return <CreateUserComponent onCreate={onCreateUser} />;
};

export { CreateUserScreen };
