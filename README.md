## 23H2 Frontend Assignment for Global Dev Squad Applicants 


## 한번도 안해본 ReactNetive 가 과제라니!!!

> 우선 저에게 ReactNetive 를 배울 수 있는 강력한 동기를 부여해 주셔서 정말로 감사합니다 🥲🥲

[👉🏻 ReactNetive 공부의 흔적 보러가기 ](https://velog.io/@dpwns108)

# 결과물 

![결과물](https://github.com/CHOIYEJUN/MMtalk_Test/assets/87467631/3eb94a06-169b-45e6-8964-3b36c09a9817)

구현한 기능

1. TodoList 의 추가 삭제 
2. TodoList 의 체크박스를 클릭했을때 체크기능 및 TodoList Progress Bar 연동
3. Week Select 및 스크롤 기능


느낀점
1. 비슷하면서도 다른 react 와 reactNetive
- react 는 html 태그를 사용하지만 reactNetive 는 View, Text, TextInput 등의 태그를 사용한다. 옌 웹 문서가 아니니까... ㅎㅎ)
- 상태관리 방식이 비슷하다. (useState, useEffect, useRef 등등)
- 이곳은 모바일 환경이다. ui 와 기능들이 웹과는 확연히다르다.
- React Native는 거의 모든 CSS 기능을 구현하려고 노력했지만, CSS 애니메이션 구현 툴인 keyframes 는 옮겨오지 못했다. 그래서 복잡한 애니메이션을 구현하려면 복잡한 과정이 요구된다.
- 디버깅이 쉽지 않다.. (죄다  console.log 찍어봐야 한다. )

2. 이제 무엇을 해볼까
- 일주일 동안 작성하고 공부했던 내용들을 기술블로그에 정리해볼것이다. 
- reactNetive 를 이용해서 기존에 만들었던 배드민턴 게스트 예약 시스템을 모바일 환경으로 만들어볼것이다. (백엔드 API 와 통신하는 과정도 궁금하다.)

# 문제의 발생과 해결


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

디버그를 console.log 로만 찍다보니 문제 파악이 쉽지 않았던것 같다..
(web 디버그 찍기는 쉬웠는데 ㅠㅠㅠ)

## 2023 12 01  고민중.. 

> ADD 버튼만 눌렀는데 어떻게 바로 자판이 올라오지?...

그동안은 TextInput 에 글자를 입력하고 ADD 버튼을 눌러서 추가시켰는데... 
이번에는 ADD 버튼만 눌렀을때 자판이 올라오게 하려면 어떻게 해야하는지 모르겠다..

## 2023 12 02 

> keyboard 를 띄워주는 기능은 없다고 한다..

설마 TextInput 을 어딘가에 숨겨놓고 ADD 버튼을 누르면 숨겨놓은 textInput 에 포커싱을 하는
이상한 방법으로 하면 안되겠지? 라고 생각했었지만

#### 바로 그게 정답..ㅎㅎ

```javascript
<View 
      style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}
    >
  // 어딘가로 숨겨버린 textInput
      <TextInput
        style={{ position: 'absolute', left: -1000 }}
        ref={textInputRef}
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
        onSubmitEditing={handleTextInputSubmit}
      />
      <Button title="Add" onPress={handleButtonPress} color={'#FF7484'} />
    </View>
````
