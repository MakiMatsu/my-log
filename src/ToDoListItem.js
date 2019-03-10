import React, { Component } from "react";
import "./ToDoListItem.css";

class ToDoListItem extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       delete: false
  //     };
  //   }
  //   deleteTodo() {
  //     this.setState({ delete: !this.delete });
  //   }

  render() {
    const { title, description, time, location, ...props } = this.props;
    return (
      <div className="ToDoListItem" {...props}>
        <div className="ToDoListItem-title">{title}</div>
        <div className="ToDoListItem-description">{description}</div>
        <div className="ToDoListItem-time">{time}</div>
        <div className="ToDoListItem-location">{location}</div>
        <div className="ToDoListItem-delete">
          {/* <button onClick={() => this.deleteTodo()}>削除</button> */}
          <button>削除</button>
        </div>
      </div>
    );
  }
}

export default ToDoListItem;
