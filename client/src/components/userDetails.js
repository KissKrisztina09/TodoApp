import React, {Component} from "react";

export default class UserDetails extends Component{
componentDidMount(){
    fetch("http://localhost:5000/userDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({token:window.localStorage.getItem("token")}),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userLogin");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

render(){
    return (
    <div>
        Name<h1></h1>
    </div>)
    
}

}