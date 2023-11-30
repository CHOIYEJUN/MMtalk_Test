// components/ProgressBarComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarComponentProps {
  totalTodos: number;
  completedTodos: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({
                                                                     totalTodos,
                                                                     completedTodos,
                                                                   }) => {
  const progressPercentage = (completedTodos / totalTodos) * 100 || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>{`Progress: ${progressPercentage.toFixed(2)}%`}</Text>
      <View style={styles.progressBar}>
        <View
          style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: 'blue',
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ProgressBarComponent;
