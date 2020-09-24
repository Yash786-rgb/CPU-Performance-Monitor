import React from "react";
import moment from "moment";
import "./widget.css";
function Info(props) {
  var norTime = moment.duration(props.data.osUpTime).humanize();
  return (
    <div className="col-sm-3 col-sm-offset-1 cpu-info">
      <h3>Operating System</h3>
      <div className="widget-text">{props.data.osType}</div>
      <h3>Time Online</h3>
      <div className="widget-text">{norTime}</div>
      <h3>Processor information</h3>
      <div className="widget-text">
        <strong>Type:</strong> {props.data.cpuModel}
      </div>
      <div className="widget-text">
        <strong>Number of Cores:</strong>
        {props.data.numCores}
      </div>
      <div className="widget-text">
        <strong>Clock Speed:</strong> {props.data.cpuSpeed}
      </div>
    </div>
  );
}

// class Info extends React.Component{
//     render(){

//         return(
//            <div className = "col-lg-4">
//             <h2>Operating System</h2>
//             <p3>{this.props.data.osType}</p3>
//             <h2>Time online</h2>
//             <p3>{this.props.data.osUptime}</p3>
//             <h2>Processor Info</h2>
//             <p1>Type  :  </p1>
//             <p2>{this.props.data.cpuModel} </p2>
//             <br/>
//             <p1>Number of cores : </p1>
//             <p2>{this.props.data.numCores}</p2>
//             <br/>
//             <p1>Clock Speed : </p1>
//             <p2>{this.props.data.cpuSpeed}</p2>
//         </div>
//         )
//     }
// }
export default Info;
