import React, { useState } from "react";
import socket from "./socket.js";
import Widget from "./widget.js";
var fullData = [];
class App extends React.Component {
  constructor() {
    super();
    this.state = { perfData: [] };
  }
  componentDidMount() {
    socket.on("data", (d) => {
      var ans = false;
      for (var i = 0; i < fullData.length; i++) {
        if (fullData[i].macA == d.macA) {
          fullData[i] = d;
          ans = true;
          break;
        }
      }
      console.log("ans", ans);
      if (!ans) {
        fullData.push(d);
      }
      this.setState({ perfData: fullData });
    });
  }
  render() {
    var wid = [];
    var dy = this.state.perfData;
    for (var i = 0; i < dy.length; i++) {
      wid.push(<Widget key={i} ord={i} data={dy[i]} />);
    }
    return <div>{wid}</div>;
  }
}

export default App;
