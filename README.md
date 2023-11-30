## 23H2 Frontend Assignment for Global Dev Squad Applicants 


## 한번도 안해본 ReactNetive 가 과제라니!!!

> 우선 저에게 ReactNetive 를 배울 수 있는 강력한 동기를 부여해 주셔서 정말로 감사합니다 🥲🥲

[👉🏻 ReactNetive 공부의 흔적 보러가기 ](https://velog.io/@dpwns108)



## 2023 11 30 문제봉착... 

문제영상

![개망함](https://github.com/CHOIYEJUN/MMtalk_Test/assets/87467631/494e85e2-fb5e-45e8-aa8d-8263b1fe6b5c)

TodoList 의 체크박스를 클릭했을때 체크가 되고,  해당 TodoItem 의 텍스트가 취소선이 그어지는 기능을 구현해야 한다. 
하지만 취소선은 Week 1 에서만 생기고, 
첫번째 todoList 를 클릭하면 모든 Week 의 첫번째 TodoList 가 체크된다..  (취소선 안되는건 덤)

Data 자체는 잘 get 하고 set 하는것 같은데,  해당 체크박스를 그려줄때  잘못 그려주고 있나.... 하는 생각이 든다.
2시간째 찾는중이다... 소스는 아래와 같다.

```javascript
// 해당 Week 의 TodoList 를 그려주는 함수 
{todos.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
           <BouncyCheckbox
                   isChecked={todo.completed}
                   onPress={() => handleToggleTodo(index)}
           />
           <Text style={[styles.todoText , {textDecorationLine : todo.completed ? 'line-through' : 'none' } ]}>{todo.content}</Text>
        </View>
))}


// TodoList 체크 박스 체크하면 체크된 데이터 확인해서 
// completed 값 바꿔주는 함수
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

```
이중에 범인이 있지 않을까... 

디버그를 찍는 방법을 잘 모르겠어서 해매고 있다... 
디버그 찍는 방법부터 찾아봐야겠다ㅠㅠㅠ


## 2023 12 01 0시 45분  문제해결

### 해결해따

> 멍청했다...

```javascript
// TodoList 체크 박스 체크하면 체크된 데이터 확인해서 
// completed 값 바꿔주는 함수
  const handleToggleTodo = (weekNumber: number, index: number) => {
    setTodoData(
      (prevData) =>
      prevData.map((todo, i) =>
        
        // 이부분이 문제였다. ( i === index)
         todo.weekNumber === weekNumber && i === index
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
```
weekNumber 1에 3개의 데이터가 있고 weekNumber 2에 3개의 데이터가 있을때
weekNumber 2 의 첫번째 todoList 를 클릭하면 weekNumber : 1 index : 0 이 나오지만,
i 에는 3이 들어가 버린 것이였다.... 왜냐면 prevData 는 0,1,2, "3" 번째를 돌고있으니...

#### 그래서 아래와 같이 수정하였다. 

```javascript
  const handleToggleTodo = (weekNumber: number, index: number) => {
  setTodoData((prevData) => {
    console.log('Previous Data:', prevData);

    // 주어진 주차에 해당하는 todo만 필터링
    const filteredData = prevData.filter((todo) => todo.weekNumber === weekNumber);

    // 필터링된 todo를 map을 사용하여 업데이트
    const updatedData = filteredData.map((todo, todoIndex) => {
      console.log(todoIndex + ' Todo:', todo);
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
```
받아온 weekNumber 에 해당하는 데이터만 필터링을 해주고,
필터링된 데이터에서만 비교하였다.
나머지는 따로 넣어주는 형태로 기능을 수정했다!!
