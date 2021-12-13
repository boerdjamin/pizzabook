import * as React from 'react';
import { base } from '../../../airtable';
import CreateUserComponent from './create-user-component';

interface CreateUserScreenProps {}

const CreateUserScreen: React.FC<CreateUserScreenProps> = () => {
  const onCreateUser = (name: string) => {
    base('Users').create(
      [
        {
          fields: {
            name,
          },
        },
      ],
      (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        if (records) {
          records.forEach(function (record) {
            console.log(record.getId());
          });
        }
      },
    );
  };
  return <CreateUserComponent onCreate={onCreateUser} />;
};

export default CreateUserScreen;
