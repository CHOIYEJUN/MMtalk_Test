import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TextInputButtonModule from "./ContentBoxModuls/TextInputButtonModule";
import ProgressBarModule from "./ContentBoxModuls/ProgressBarModule";
import TodoListModule from "./ContentBoxModuls/TodoListModule";




interface WeekContentBoxComponentProps {
  weekNumber: number;
  todos: TodoItem[];
  onAddTodo: (weekNumber: number, content: string) => void;
  onToggleTodo: (weekNumber: number, index: number) => void;
  onDeleteTodo: (weekNumber: number, index: number) => void;
  editMode: boolean;
}

const WeekContentBoxComponent:
  React.FC<WeekContentBoxComponentProps> = ({
                                              weekNumber,
                                              todos,
                                              onToggleTodo,
                                              onDeleteTodo,
                                              editMode
  }) => {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBarModule completedTodos={todos.filter((todo) => todo.completed).length} totalTodos={todos.length} />
      <TodoListModule
        todos={todos}
        editMode={editMode}
        handleToggleTodo={(index: number) => onToggleTodo(weekNumber, index)}
        handleDeleteTodo={(index: number) => onDeleteTodo(weekNumber, index)}
      />


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },

});

export default WeekContentBoxComponent;
