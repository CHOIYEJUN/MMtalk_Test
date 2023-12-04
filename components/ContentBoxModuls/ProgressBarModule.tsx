// ProgressBarModule.js
import React from "react";
import { View, Text } from "react-native";

interface ProgressBarModuleProps {
  completedTodos: number;
  totalTodos: number;
}

const ProgressBarModule: React.FC<ProgressBarModuleProps> = ({ completedTodos, totalTodos }) => {
  const progressPercentage = (completedTodos / totalTodos) * 100 || 0;

  return (
    <View
      style={{ marginTop: 0, width: '100%', alignItems: 'center' }}
    >
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }}
      >
        <Text>{`${completedTodos} of ${totalTodos} completed`}</Text>
        <Text>{`${progressPercentage.toFixed()}%`}</Text>
      </View>
      <View
        style={{ height: 5, backgroundColor: 'lightgray', borderRadius: 5, width: '100%', marginBottom: 20 }}
      >
        <View
          style={{ width: progressPercentage + '%', height: '100%', backgroundColor: '#44CEC6', borderRadius: 5 }}
        />
      </View>
    </View>
  );
};



export default ProgressBarModule;
