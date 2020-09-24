var express = require("express");
var app = express();
var port = process.env.PORT || 1001;
var server = app.listen(port);
var io = require("socket.io")(server);
var mongoose = require("mongoose");
var C = "mongodb://localhost/cpu__data";
mongoose.connect(C, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var machineSchema = new mongoose.Schema({
  macA: String,
  osType: String,
  upTime: Number,
  freeMem: Number,
  totalMem: Number,
  usedMem: Number,
  memUsage: Number,
  cpuModel: String,
  cpuSpeed: Number,
  numCores: Number,
  cpuLoad: String,
});
var Machine = mongoose.model("machine", machineSchema);
var os = require("os");
var stat = require("cpu-stat");
function getLoad() {
  return new Promise((resolve, reject) => {
    stat.usagePercent(function (err, percent, second) {
      if (err) throw err;
      resolve(Math.floor(percent));
    });
  });
}
function myFun() {
  return new Promise(async (resolve, reject) => {
    const osType = os.type();
    const upTime = os.uptime();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor(100 * (usedMem / totalMem));
    const cpus = os.cpus();
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const numCores = cpus.length;
    const cpuLoad = await getLoad();
    resolve({
      osType,
      upTime,
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      cpuModel,
      cpuSpeed,
      numCores,
      cpuLoad,
    });
  });
}
var nt = os.networkInterfaces();
var m = Object.keys(nt);
var macAd;
m.forEach((e) => {
  var arr = nt[e];
  if (!arr[0].internal) {
    macAd = arr[0].mac;
  }
});
function checkAndAdd(e) {
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: macAd }, function (err, found) {
      if (err) {
        throw err;
      } else if (found == null) {
        e.macA = macAd;
        Machine.create(e);
      }
    });
  });
}

io.on("connection", (socket) => {
  Machine.find({}, function (err, found) {
    found.forEach((e) => {
      e.isActive = false;
      socket.emit("data", e);
    });
  });

  myFun().then(async (d) => {
    await checkAndAdd(d);
  });
  setInterval(() => {
    myFun().then((d) => {
      d.isActive = true;
      d.macA = macAd;
      socket.emit("data", d);
    });
  }, 1000);
});
app.get("/", (req, res) => {
  res.send("from Server");
});

// console.log(os.networkInterfaces());
