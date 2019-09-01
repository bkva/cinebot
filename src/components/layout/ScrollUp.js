import React, { Component } from "react";
import ScrollUpButton from "react-scroll-up-button";

export default class ScrollUp extends Component {
  render() {
    return (
      <div>
        <ScrollUpButton
          StopPosition={0}
          ShowAtPosition={125}
          style={{ bottom: "60px" }}
        />
      </div>
    );
  }
}
