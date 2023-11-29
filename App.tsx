// App.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import WeekComponent from './components/WeekComponent';
import WeekContentBoxComponent from './components/WeekContentBoxComponent';
import AddButtonComponent from './components/AddButtonComponent';

const App: React.FC = () => {

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
      <WeekComponent weeks={40} />

      <WeekContentBoxComponent />

      <AddButtonComponent />

    </SafeAreaView>
  );
};

export default App;
