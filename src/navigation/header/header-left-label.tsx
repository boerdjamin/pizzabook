import * as React from 'react';

import { Spacing, commonStyles } from '../../styles';

import { Label } from '../../components';
import { appTexts } from '../../data';
import { useNavigation } from '@react-navigation/native';

const HeaderLeftLabel = () => {
  const { goBack } = useNavigation();
  return (
    <Label
      text={appTexts.back}
      onPress={goBack}
      additionalStyle={[
        commonStyles.headerLabel,
        { marginLeft: Spacing.medium },
      ]}
    />
  );
};

export { HeaderLeftLabel };
