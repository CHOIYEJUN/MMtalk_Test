import ProgressBarComponent from './ProgressBarComponent';
import AddButtonComponent from './AddButtonComponent';
import React, { useState } from "react";
import { View } from "react-native";

const WeekContentBoxComponent = () => {
  const [totalChecklists, setTotalChecklists] = useState(0);
  const [completedChecklists, setCompletedChecklists] = useState(0);

  const handleAddChecklist = () => {
    setTotalChecklists(totalChecklists + 1);
    // You can customize the logic for updating completed checklists based on user interaction.
    // For now, let's assume a checklist is completed when it is added.
    setCompletedChecklists(completedChecklists + 1);
  };

  return (
      <View>
      <ProgressBarComponent
        totalChecklists={totalChecklists}
        completedChecklists={completedChecklists}
      />
      </View>
  );

};

export default WeekContentBoxComponent;
