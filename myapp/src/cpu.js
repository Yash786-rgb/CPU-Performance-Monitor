import React from "react";
import drawCircle from "./draw.js";
import "./widget.css";
class Cpu extends React.Component {
  componentDidMount() {
    var cpuName = "cpu" + this.props.ord;
    var canvas = document.querySelector(`.${cpuName}`);
    drawCircle(canvas, this.props.data.cpuLoad);
  }
  componentDidUpdate() {
    var cpuName = "cpu" + this.props.ord;
    var canvas = document.querySelector(`.${cpuName}`);
    drawCircle(canvas, this.props.data.cpuLoad);
  }
  render() {
    var cpuName = "cpu" + this.props.ord;
    var cpLoad = this.props.data.cpuLoad;
    return (
      <div className="col-lg-3 cpu">
        <h3>Cpu Load</h3>
        <div className="canvas-wrapper">
          <canvas className={cpuName} height="200" width="200"></canvas>
          <div className="cpu-text">{cpLoad}%</div>
        </div>
      </div>
    );
  }
}
export default Cpu;
