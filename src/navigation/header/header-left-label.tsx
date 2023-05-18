import * as React from 'react';

import { Label } from '../../components';
import { appTexts } from '../../data';
import { commonStyles } from '../../styles';
import { useNavigation } from '@react-navigation/native';

const HeaderLeftLabel = () => {
  const { goBack } = useNavigation();
  return (
    <Label
      text={appTexts.back}
      onPress={goBack}
      additionalStyle={commonStyles.headerLabel}
    />
  );
};

export { HeaderLeftLabel };
