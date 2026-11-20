// Screen-printed ornament illustration in the invitation's three ink colours.
const painting = document.querySelector("#ornaments").getContext("2d");
painting.scale(2, 2);
const pine = "#305845", berry = "#a53c42", linen = "#f8f1df";

function line(points, colour, width) {
  painting.beginPath();
  points.forEach(([x,y], i) => i ? painting.lineTo(x,y) : painting.moveTo(x,y));
  painting.strokeStyle = colour;
  painting.lineWidth = width;
  painting.stroke();
}

function snow(x,y,r,colour) {
  painting.save();
  painting.translate(x,y);
  for (let i=0;i<6;i++) {
    line([[0,0],[0,-r]],colour,2);
    for (const h of [.48,.74]) {
      line([[-r*.19,-r*(h+.13)],[0,-r*h],[r*.19,-r*(h+.13)]],colour,1.8);
    }
    painting.rotate(Math.PI/3);
  }
  painting.restore();
}

function globe(x,y,r,colour,pattern) {
  line([[x,0],[x,y-r-8]],berry,2);
  painting.fillStyle = "#af8961";
  painting.fillRect(x-9,y-r-10,18,14);
  painting.save();
  painting.beginPath();
  painting.arc(x,y,r,0,2*Math.PI);
  painting.fillStyle=colour;
  painting.fill();
  painting.clip();
  if (pattern==="snow") {
    for (const [dx,dy,size] of [[-.56,-.4,.3],[.28,-.13,.47],[-.34,.49,.31],[.65,.62,.28]]) snow(x+dx*r,y+dy*r,r*size,linen);
  } else if (pattern==="bands") {
    painting.fillStyle=linen;
    painting.fillRect(x-r,y-r*.32,r*2,r*.65);
    for (let i=-2;i<=2;i++) {
      painting.fillStyle=pine;
      painting.beginPath(); painting.ellipse(x+i*r*.4,y,r*.13,r*.055,-.55,0,Math.PI*2); painting.fill();
      painting.fillStyle=berry;
      painting.beginPath(); painting.arc(x+i*r*.4+5,y+5,3,0,Math.PI*2); painting.fill();
    }
  } else {
    for (const k of [-1,-.45,.45,1]) {
      painting.beginPath(); painting.moveTo(x,y-r);
      painting.bezierCurveTo(x+k*r*1.2,y-r*.45,x+k*r*1.2,y+r*.45,x,y+r);
      painting.strokeStyle=berry; painting.lineWidth=6; painting.stroke();
    }
  }
  painting.restore();
  painting.save(); painting.translate(x,y-r-12);
  for(const side of [-1,1]){
    painting.save(); painting.scale(side,1); painting.beginPath(); painting.moveTo(0,0);
    painting.bezierCurveTo(32,-33,51,-7,0,0); painting.bezierCurveTo(12,6,7,12,20,17);
    painting.strokeStyle=berry; painting.lineWidth=3; painting.stroke(); painting.restore();
  }
  painting.restore();
}
globe(101,148,70,pine,"snow");
globe(219,214,48,linen,"stripes");
snow(295,93,26,berry);
globe(337,274,58,pine,"snow");
globe(435,164,77,berry,"bands");
