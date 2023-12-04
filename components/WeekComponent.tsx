import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface WeekComponentProps {
  weeks: number;
  onSelectWeek: (weekNumber: number) => void;
}

const WeekComponent: React.FC<WeekComponentProps> = ({ weeks, onSelectWeek  }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const onPressWeek = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    onSelectWeek(weekNumber);
  }

  const onMomentumScrollEnd = (event: any) => {
    if (scrollViewRef.current) {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const centerIndex = Math.round(contentOffset / 55); // Adjust this value based on your button width
      const selectedWeekFromIndex = centerIndex + 1;
      setSelectedWeek(selectedWeekFromIndex);
      onSelectWeek(selectedWeekFromIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={(ref) => (scrollViewRef.current = ref)}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        decelerationRate= 'fast'
        scrollEventThrottle={16} // Adjust the throttle value if needed
      >
        {Array.from({ length: weeks }, (_, index) => index + 1).map((item) => (
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
              Week
            </Text>
            <Text
              style={[
                styles.weekText,
                { color: selectedWeek === item ? 'white' : 'grey', fontSize: 18, fontWeight: 'bold' },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  weekButton: {
    padding: 10,
    margin: 5,
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  weekText: {
    textAlign: 'center',
  }
});

export default WeekComponent;
