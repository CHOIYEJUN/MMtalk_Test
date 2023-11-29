import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarComponentProps {
  totalChecklists: number;
  completedChecklists: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ totalChecklists, completedChecklists }) => {
  const percentage = totalChecklists > 0 ? (completedChecklists / totalChecklists) * 100 : 0;

  return (
    <View>
      <View
        style={{
          height: 20,
          width: '100%',
          backgroundColor: 'gray',
          borderRadius: 10,
          overflow: 'hidden',
        }}
        >
        <Text>Progress: {percentage.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

export default ProgressBarComponent;
