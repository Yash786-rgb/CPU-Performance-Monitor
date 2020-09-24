import React from "react";
import drawCircle from "./draw2.js";
import "./widget.css";
class Mem extends React.Component {
  componentDidMount() {
    var memName = "mem" + this.props.ord;
    var canvas = document.querySelector(`.${memName}`);
    drawCircle(canvas, this.props.data.memUsage);
  }
  componentDidUpdate() {
    var memName = "mem" + this.props.ord;
    var canvas = document.querySelector(`.${memName}`);
    drawCircle(canvas, this.props.data.memUsage);
  }
  render() {
    var memLoad = this.props.data.memUsage;
    var totalMem = this.props.data.totalMemory;
    var freeMem = this.props.data.freeMemory;
    var totalMemInGb = Math.floor((totalMem / 1073741824) * 100) / 100;
    var freeMemInGb = Math.floor((freeMem / 1073741824) * 100) / 100;
    var memName = "mem" + this.props.ord;
    return (
      <div className="col-lg-3 mem">
        <h3>Memory Usage</h3>
        <div className="canvas-wrapper ">
          <canvas className={memName} height="200" width="200"></canvas>
          <div className="mem-text">{memLoad}%</div>
        </div>
        <div>Total Memory:{totalMemInGb}GB</div>
        <div>Free Memory:{freeMemInGb}GB</div>
      </div>
    );
  }
}
export default Mem;
