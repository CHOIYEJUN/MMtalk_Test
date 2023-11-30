// App.tsx
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import WeekComponent from './components/WeekComponent';
import WeekContentBoxComponent from './components/WeekContentBoxComponent';
import AddButtonComponent from './components/AddButtonComponent';

const initialData = [
  {
    weekNumber: 1,
    content: 'Track your ovulation cycle to an idea of when you will be ovulating.',
    completed: false,
  },
  {
    weekNumber: 1,
    content: 'Study about symptoms of ovulation',
    completed: false,
  },
  {
    weekNumber: 1,
    content: 'Take folic acid',
    completed: false,
  },
  {
    weekNumber: 2,
    content: 'Keep a record of your weight ',
    completed: false,
  },
  {
    weekNumber: 2,
    content: 'Reduce caffeine intake ',
    completed: false,
  },
  {
    weekNumber: 2,
    content: 'Take folic acid',
    completed: false,
  },
  {
    weekNumber: 3,
    content: 'Get an at-home pregnancy test ',
    completed: false,
  },
  {
    weekNumber: 3,
    content: 'Buy superfood that is good for pregnant women',
    completed: false,
  },
  {
    weekNumber: 3,
    content: 'Take folic acid',
    completed: false,
  },
  {
    weekNumber: 4,
    content: 'Eat leafy greens to increase iron intake. ',
    completed: false,
  },
  {
    weekNumber: 4,
    content: 'Schedule an appointment with a OBGYN.',
    completed: false,
  },
  {
    weekNumber: 4,
    content: 'Take folic acid',
    completed: false,
  }
];


const App: React.FC = () => {

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [todoData, setTodoData] = useState(initialData);

  useEffect(() => {
    handleSelectWeek(1);
  }, []);


  const handleSelectWeek = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
  };

  const handleAddTodo = (weekNumber: number, content: string) => {
    const newTodo = {
      weekNumber,
      content,
      completed: false,
    };
    setTodoData((prevData) => [...prevData, newTodo]);
  };

  const handleToggleTodo = (weekNumber: number, index: number) => {
    setTodoData(
      (prevData) =>
      prevData.map((todo, i) =>
         todo.weekNumber === weekNumber && i === index
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };


  return (
    <SafeAreaView style={{ flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
          paddingHorizontal: 20, // 좌우 여백 조절
          alignItems: 'center',
          }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >CheckList</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'right',
          }}
        >Edit</Text>
      </View>
      <WeekComponent weeks={40} onSelectWeek={handleSelectWeek} />

      {selectedWeek !== null && (
        <WeekContentBoxComponent
          weekNumber={selectedWeek}
          todos={todoData.filter((todo) => todo.weekNumber === selectedWeek)}
          onAddTodo={handleAddTodo}
          onToggleTodo={handleToggleTodo}
        />
      )}


    </SafeAreaView>
  );
};

export default App;
