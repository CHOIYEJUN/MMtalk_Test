import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface WeekComponentProps {
  weeks: number;
  onSelectWeek: (weekNumber: number) => void;
}

const WeekComponent: React.FC<WeekComponentProps> = ({ weeks, onSelectWeek  }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const flatListRef = useRef<FlatList | null>(null);

  const onPressWeek = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    onSelectWeek(weekNumber);
  }

  const onMomentumScrollEnd = (event: any) => {
    if (flatListRef.current) {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const centerIndex = Math.round(contentOffset / (45 + 1 * 5)); // Adjust for button width and margin
      const selectedWeekFromIndex = centerIndex + 1;
      setSelectedWeek(selectedWeekFromIndex);
      onSelectWeek(selectedWeekFromIndex);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        horizontal
        data={Array.from({ length: weeks }, (_, index) => index + 1)}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            onPress={() => onPressWeek(item)}
            style={[
              styles.weekButton,
              { backgroundColor: selectedWeek === item ? '#FF7484' : '#eee' },
            ]}
          >
            <Text
              style={[
                styles.weekText,
                { color: selectedWeek === item ? 'white' : 'grey', fontSize: 10 },
              ]}
            >
              Week</Text>
            <Text
              style={[
                styles.weekText,
                { color: selectedWeek === item ? 'white' : 'grey', fontSize: 18, fontWeight: 'bold' },
              ]}
            >
              {item}</Text>

          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
        onMomentumScrollEnd={onMomentumScrollEnd}
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
    width: 45,
    height: 60, // 버튼을 정사각형으로 만듦
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  weekText: {
    textAlign: 'center',
  }
});

export default WeekComponent;
