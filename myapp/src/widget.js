import React from "react";
import Cpu from "./cpu.js";
import Mem from "./mem.js";
import Info from "./info.js";
import "./widget.css";
function Widget(props) {
  var fullData = props.data;
  var isActive = props.data.isActive;
  var memData = {
    memUsage: fullData.memUsage,
    totalMemory: fullData.totalMem,
    freeMemory: fullData.freeMem,
  };
  var infoData = {
    osType: fullData.osType,
    osUptime: fullData.osUptime,
    cpuModel: fullData.cpuModel,
    numCores: fullData.numCores,
    cpuSpeed: fullData.cpuSpeed,
  };
  var cpuL = { cpuLoad: fullData.cpuLoad };
  var myDiv = "";
  if (!isActive) {
    myDiv = <div className="not-active">Offline</div>;
  }
  return (
    <div className="row widget">
      {myDiv}
      <Cpu ord={props.ord} data={cpuL} />
      <Mem ord={props.ord} data={memData} />
      <Info data={infoData} />
    </div>
  );
}
export default Widget;
