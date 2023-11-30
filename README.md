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


## 구현 




