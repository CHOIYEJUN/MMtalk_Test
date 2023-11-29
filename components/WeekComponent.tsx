import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface WeekComponentProps {
  weeks: number;
}

const WeekComponent: React.FC<WeekComponentProps> = ({ weeks }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const renderWeekButton = (week: number) => {
    return (
      <TouchableOpacity
        key={week}
        onPress={() => setSelectedWeek(week)}
        style={[
          styles.weekButton,
          { backgroundColor: selectedWeek === week ? 'blue' : 'gray' },
        ]}
      >
        <Text style={{ color: 'white' }}>{week} Week</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={Array.from({ length: weeks }, (_, index) => index + 1)}
        renderItem={({ item }) => renderWeekButton(item)}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로 방향으로 정렬

  },
  weekButton: {
    padding: 10,
    margin: 5,
    width: 70,
    height: 70, // 버튼을 정사각형으로 만듦
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default WeekComponent;
