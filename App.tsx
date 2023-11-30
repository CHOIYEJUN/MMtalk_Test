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
    setTodoData((prevData) => {
      // 주어진 주차에 해당하는 todo만 필터링
      const filteredData = prevData.filter((todo) => todo.weekNumber === weekNumber);
      // 필터링된 todo를 map을 사용하여 업데이트
      const updatedData = filteredData.map((todo, todoIndex) => {
        if (todoIndex === index) {
          // 주어진 index에 해당하는 todo의 completed를 토글
          const updatedTodo = {
            ...todo,
            completed: !todo.completed,
          };
          console.log('Updated Todo:', updatedTodo);
          return updatedTodo;
        }
        return todo;
      });
      // 기존 데이터 중에서 해당 주차의 데이터만 업데이트된 데이터로 교체
      return prevData.map((todo) =>
        todo.weekNumber === weekNumber ? updatedData.shift() || todo : todo
      );
    });
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
