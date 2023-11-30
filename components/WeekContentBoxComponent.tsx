import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,  Button, ScrollView, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
interface TodoItem {
  weekNumber: number;
  content: string;
  completed: boolean;
}

interface WeekContentBoxComponentProps {
  weekNumber: number;
  todos: TodoItem[];
  onAddTodo: (weekNumber: number, content: string) => void;
  onToggleTodo: (weekNumber: number, index: number) => void;
}

const WeekContentBoxComponent:
  React.FC<WeekContentBoxComponentProps> = ({
  weekNumber, todos, onAddTodo, onToggleTodo, }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      onAddTodo(weekNumber, newTodo);
      setNewTodo('');
    }

  };

  const handleToggleTodo = (index: number) => {
    onToggleTodo(weekNumber, index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20, // 좌우 여백 조절
          alignItems: 'center',

        }}
      >
        <TextInput
          style={[styles.input, { marginRight: 10 }]}
          placeholder="Add a new todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}

        />
        <Button
          title="Add"
          onPress={handleAddTodo}
          color={'#FF7484'}
        />
      </View>


      <Text style={styles.header}>Week {weekNumber} Todo List</Text>
      {todos.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
          <BouncyCheckbox
            disableBuiltInState={todo.completed}
            onPress={(isChecked: boolean) => handleToggleTodo(index)}
          />
          <Text style={styles.todoText}>{todo.content}</Text>
        </View>
      ))}


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign : 'left',
    marginBottom: 5,
    width: '80%',
    marginRight: 40,

  },
  todoText: {
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default WeekContentBoxComponent;
