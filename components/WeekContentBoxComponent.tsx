import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import CheckBox from '@react-native-community/checkbox';
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
  onDeleteTodo: (weekNumber: number, index: number) => void;
}

const WeekContentBoxComponent:
  React.FC<WeekContentBoxComponentProps> = ({
  weekNumber, todos, onAddTodo, onToggleTodo, onDeleteTodo, editMode}) => {
  const [newTodo, setNewTodo] = useState('');
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const handleDeleteTodo = (index: number) => {
    onDeleteTodo(weekNumber, index);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      onAddTodo(weekNumber, newTodo);
      setNewTodo('');
    }
  };
  const progressPercentage = (completedTodos / totalTodos) * 100 || 0;

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

      {todos.length === 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
            <Image
              source={require('../image/noData.png')} // 쓰레기통 아이콘 이미지 경로로 변경
              style={{ width: 200, height: 150, marginTop: 20}}
            />
            <Text style={{
              marginTop: 20,
              color: 'grey',
              fontSize: 20,
              fontWeight:600
            }}>
              No checklists
            </Text>
          <Text style={{
            marginTop: 5,
            color: 'grey',
            fontSize: 14,
          }}>
            Add checklists that should be checked weekly.
          </Text>
        </View>
        )}

      {todos.length > 0 && (
      <View
        style={{
          marginTop: 20,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View style={styles.progressBox}>
          <Text style={styles.progressText}>{`${completedTodos} of ${totalTodos} completed`}</Text>
          <Text style={styles.progressText}>{`${progressPercentage.toFixed()}%`}</Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={{
              width: progressPercentage + '%',
              height: '100%',
              backgroundColor: '#FF7484',
              borderRadius: 5,
            }}
          >

          </View>
        </View>

        {todos.map((todo, index) => (
          <View key={index} style={styles.todoItem}>
            {editMode ? (
              <TouchableOpacity onPress={() => handleDeleteTodo(index)}>
                <Image
                  source={require('../image/delete-icon.png')} // 쓰레기통 아이콘 이미지 경로로 변경
                  style={{ width: 20, height: 20}}
                />
              </TouchableOpacity>
            ) : (
              <CheckBox
                onValueChange={() => handleToggleTodo(index)}
                value={todo.completed}
              />
            )}
            <Text
              style={
              [
                styles.todoText ,
                {textDecorationLine : todo.completed ? 'line-through' : 'none' }
              ]}>
              {todo.content}
            </Text>
          </View>
        ))}
      </View>
      )}

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
  progressBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
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
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,


  },
});

export default WeekContentBoxComponent;
