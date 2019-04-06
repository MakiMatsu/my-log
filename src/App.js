import React, { Component } from "react";
import "./App.css";
import ToDoListItem from "./ToDoListItem.js";
// import moment from "moment";

class App extends Component {
  // ToDoListをstateに定義、初期値はlocalStorageから取得または []
  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    removeTodo: this.removeTodo
  };

  // todoList itemの追加
  addTodo = (item, callBack) => {
    // todoList stateに追加
    this.setState(
      {
        todoList: this.state.todoList.concat(item)
      },
      () => {
        // localStorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack();
      }
    );
  };

  // todoListからitemを削除
  removeTodo = (id, callBack) => {
    this.state.todoList.map((todo, i) => {
      if (todo.id === id) {
        this.state.todoList.splice(i, 1);
        this.setState(
          {
            todoList: this.state.todoList
          },
          () => {
            // localStorageにtodoList stateを保存
            localStorage.setItem(
              "todoList",
              JSON.stringify(this.state.todoList)
            );
            // callBack関数が引数に渡されていた場合に実行
            callBack && callBack();
          }
        );
      }
    });
  };

  render() {
    const uuidv1 = require("uuid/v1");
    const uuidkey = uuidv1();
    return (
      <div className="App">
        {/* formの作成 */}
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"];
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];
            // idがtimeのElementを取得
            const timeElement = e.target.elements["time"];
            // idがlocationのElementを取得
            const locationElement = e.target.elements["location"];

            this.addTodo(
              {
                id: uuidkey,
                title: titleElement.value,
                description: descriptionElement.value,
                time: timeElement.value,
                location: locationElement.value
              },
              () => {
                // stateの変更後に入力した値を空にする
                titleElement.value = "";
                descriptionElement.value = "";
                timeElement.value = "";
                locationElement.value = "";
              }
            );
          }}
        >
          <div>
            <input id="title" placeholder="title" />
            <textarea id="description" placeholder="description" />
            <textarea id="time" placeholder="time" />
            <textarea id="location" placeholder="location" />
          </div>
          <div>
            <button type="submit">登録</button>
          </div>
        </form>
        {/* todoコンポーネントの作成 */}
        <div>
          {this.state.todoList.map((todo, i) => (
            <ToDoListItem
              key={todo.id}
              title={todo.title}
              description={todo.description}
              time={todo.time}
              location={todo.location}
              id={todo.id}
              // クリックされたItemをtodoList stateから削除
              removeTodo={this.removeTodo}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
