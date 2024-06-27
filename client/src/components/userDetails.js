import React, {Component} from "react";
import TodoForm  from "./TodoForm";
import TodoList from "./TodoList";

export default class UserDetails extends Component{

  constructor(props){
    super(props);
    this.state = {
      userData: {},
      tasks: [],
      title: '',
      status: '',
      dueDate: ''
    }
  }

  componentDidMount(){
    fetch("http://localhost:5000/userDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({token:window.localStorage.getItem("token")}),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({userData: data.data });
      });
}

render(){
    return (
      <div>
        <h2>HI, {this.state.userData.fname}  {this.state.userData.lname}!</h2>
        <div>
          <TodoList/>
        </div>
      </div>
    );
  }
    
}