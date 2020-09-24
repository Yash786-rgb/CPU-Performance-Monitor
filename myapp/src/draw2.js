function draw(canvas, currentLoad) {
  if (canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ccc";
    ctx.beginPath();
    ctx.clearRect(0, 0, 500, 500);
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 10;
    if (currentLoad < 20) {
      ctx.strokeStyle = "#00ff00";
    } else if (currentLoad < 40) {
      ctx.strokeStyle = "#337ab7";
    } else if (currentLoad < 60) {
      ctx.strokeStyle = "#f0ad4e";
    } else {
      ctx.strokeStyle = "#d9534f";
    }
    ctx.beginPath();
    ctx.arc(
      100,
      100,
      95,
      Math.PI * 1.5,
      (Math.PI * 2 * currentLoad) / 100 + Math.PI * 1.5
    );
    ctx.stroke();
  }
}
export default draw;
