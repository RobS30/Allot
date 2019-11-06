import React from "react";

class LoggedInAs extends React.Component {
    render(){
    return (
      
        <li>
            <span class="glyphicon glyphicon-user"></span> {this.props.userName}
      </li>
      
    );
}
  }

  export default LoggedInAs;