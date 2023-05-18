import * as React from 'react';

import { Colors, commonStyles } from '../../styles';
import { StyleSheet, View } from 'react-native';

interface HeaderWithStepsProps {
  readonly stepCount: number;
  readonly activeStepIndex: number;
}

const HeaderWithSteps = ({
  stepCount,
  activeStepIndex,
}: HeaderWithStepsProps) => {
  const stepWidth = {
    width: `${Math.round((100 - (stepCount - 1) * 2) / stepCount)}%`,
  };

  return (
    <View style={styles.container}>
      <View style={commonStyles.row}>
        {[...Array(stepCount)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.step,
              stepWidth,
              activeStepIndex === index ? styles.active : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export { HeaderWithSteps };

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 94,
    justifyContent: 'flex-end',
  },
  step: {
    height: 7,
    backgroundColor: `${Colors.secondary}${Colors.transparency32}`,
  },
  active: {
    backgroundColor: Colors.secondary,
  },
});
