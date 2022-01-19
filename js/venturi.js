var mpointer = 0;
var repeat = 0;
var flag = 0;
var sub = "";
var n = 0;
var count = 0;
var time = 0;
var gx1 = 0,
  gx2 = 0,
  gx3 = 0,
  gx4 = 0;
var gy1 = 0,
  gy2 = 0,
  gy3 = 0,
  gy4 = 0;
var dia = 0,
  k1 = 0,
  k2 = 0,
  k3 = 0;
k4 = 0;
var graph;

//Variables
var idInput = null,
  checkUnit = null,
  textDisplay = null;
var compareVal = 0,
  qCount = 0,
  resultCount = 0;
var ansDisplay = 0;
var HVal = 0;
var qactVal = 0;
var qthVal = 0;
var cdVal = 0;

function isANumber(ele) {
  ele.value = ele.value.match(/\d*(\.\d*)?/)[0];
}
//To insert input and check button
function userCalculation(elem) {
  ansDisplay++;
  var inputVal = document.createElement("input");
  var checkVal = document.createElement("input");
  var rightVal = document.createElement("span");
  inputVal.setAttribute("type", "text");
  inputVal.setAttribute("id", "res" + ansDisplay);
  rightVal.setAttribute("id", "rightAns" + ansDisplay);
  inputVal.setAttribute("oninput", "isANumber(this)");
  inputVal.classList.add("inputStyle");
  checkVal.setAttribute("type", "button");
  checkVal.setAttribute("id", "chk" + ansDisplay);
  checkVal.setAttribute("style", "cursor:pointer");
  checkVal.setAttribute("onclick", "checkResult();");
  checkVal.setAttribute("value", "CHECK");
  elem.appendChild(inputVal);
  elem.appendChild(rightVal);
  elem.appendChild(checkVal);
}
function checkResult() {
  var idd = document.getElementById("res" + ansDisplay);
  var idd1 = document.getElementById("chk" + ansDisplay);
  var ansId = document.getElementById("rightAns" + ansDisplay);

  if (simsubscreennum == 3) {
    compareVal = HVal;
    checkUnit = "cm";
  } else if (simsubscreennum == 6 && resultCount == 0) {
    compareVal = qactVal;
    checkUnit = "cm<sup>3</sup>/sec";
  } else if (simsubscreennum == 6 && resultCount == 1) {
    compareVal = qthVal;
    checkUnit = "cm<sup>3</sup>/sec";
  } else if (simsubscreennum == 6 && resultCount == 2) {
    compareVal = cdVal;
    checkUnit = "";
  }

  if (!idd.value || !idd.value != " ") {
  } else if (
    Math.floor(idd.value * 10000) / 10000 !=
      Math.floor(compareVal * 10000) / 10000 ||
    Math.floor(idd.value * 1000) / 1000 !=
      Math.floor(compareVal * 1000) / 1000 ||
    Math.floor(idd.value * 100) / 100 != Math.floor(compareVal * 100) / 100 ||
    Math.floor(idd.value * 10) / 10 != Math.floor(compareVal * 10) / 10
  ) {
    // console.log(2);
    qCount++;
    // blinkStop();
    ansId.classList.remove("resultStyle");
    idd.style.borderColor = "red";
    ansId.style.color = "red";
    ansId.innerHTML = "&#10008;";
    if (qCount == 2) {
      idd1.value = "RESULT";
    }
    if (qCount == 3) {
      idd1.style.visibility = "hidden";
      idd.parentNode.removeChild(idd);
      idd1.parentNode.removeChild(idd1);
      ansId.classList.add("resultStyle");
      ansId.style.color = "black";
      ansId.innerHTML = Math.floor(compareVal * 10000) / 10000 + checkUnit;
      goToNextFunction();
    }
  } else {
    idd1.style.visibility = "hidden";
    idd.parentNode.removeChild(idd);
    idd1.parentNode.removeChild(idd1);
    ansId.classList.add("resultStyle");
    ansId.style.color = "black";
    ansId.innerHTML =
      Math.floor(compareVal * 10000) / 10000 +
      checkUnit +
      "<span style='color:green;font-size:20px;'>&#10004;</span>";
    goToNextFunction();
  }
}
function goToNextFunction() {
  if (simsubscreennum == 3) {
    qCount = 0;
    document.getElementById("nextButton").style.visibility = "visible";
  } else if (simsubscreennum == 6 && resultCount == 0) {
    resultCount = 1;
    qCount = 0;
    switch (dia) {
      case "50mm":
        qthVal = mano50[6][p];
        break;
      case "40mm":
        qthVal = mano40[6][p];
        break;
      case "20mm":
        qthVal = mano20[6][p];
    }
    document.getElementById("75").style.visibility = "visible";
    document.getElementById("75").innerHTML = "Q<sub>th</sub>= ";
    idInput = document.getElementById("75");
    userCalculation(idInput);
  } else if (simsubscreennum == 6 && resultCount == 1) {
    resultCount = 2;
    qCount = 0;
    switch (dia) {
      case "50mm":
        cdVal = mano50[7][p];
        break;
      case "40mm":
        cdVal = mano40[7][p];
        break;
      case "20mm":
        cdVal = mano20[7][p];
        break;
    }
    document.getElementById("76").style.visibility = "visible";
    document.getElementById("76").innerHTML = "C<sub>d</sub> =  ";
    idInput = document.getElementById("76");
    userCalculation(idInput);
  } else if (simsubscreennum == 6 && resultCount == 2) {
    qCount = 0;
    resultCount = 0;
    step7Next();
  }
}

function navNext() {
  for (temp = 0; temp <= 7; temp++) {
    document.getElementById("canvas" + temp).style.visibility = "hidden";
  }
  simsubscreennum += 1;
  document.getElementById("canvas" + simsubscreennum).style.visibility =
    "visible";

  document.getElementById("nextButton").style.visibility = "hidden";
  magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow() {
  if (document.getElementById("arr").style.visibility == "hidden")
    document.getElementById("arr").style.visibility = "visible";
  else document.getElementById("arr").style.visibility = "hidden";
}

//stop blinking arrow
function myStopFunction() {
  clearInterval(myInt);
  document.getElementById("arr").style.visibility = "hidden";
}

function animateclose() {
  if (document.getElementById("close").style.visibility == "hidden")
    document.getElementById("close").style.visibility = "visible";
  else document.getElementById("close").style.visibility = "hidden";
}

function myStopFunctionclose() {
  clearInterval(myInt);
  document.getElementById("close").style.visibility = "hidden";
}
//--------------------------function for select---------------------------
$(document).ready(function () {
  $("select").change(function () {
    dia = $(this).val();
    $("#s1").text("Diameter of the pipe = " + dia);
    $("#s2").text("Length of the pipe = 3m");
    document.getElementById("pipe").disabled = "true";
    document.getElementById("select").style.visibility = "hidden";
    document.getElementById("s1").style.visibility = "visible";
    document.getElementById("s2").style.visibility = "visible";
    document.getElementById("nextButton").style.visibility = "visible";
  });
});

//-------------------------------------function magic starts here----------------------------------------------------

function magic() {
  if (simsubscreennum == 1) {
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("select").style.visibility = "visible";
    document.getElementById("select").style.animation = "pipe 1.0s 1 forwards ";
  } else if (simsubscreennum == 2) {
    repeat = repeat + 1;
    if (repeat == 1) {
      // p = Math.floor(Math.random() * (max - min + 1)) + min;
      p = Number(prompt("Please enter value from 0 to 6: to select data set"));
      k1 = p;
    } else if (repeat == 2) {
      do {
        // p = Math.floor(Math.random() * (max - min + 1)) + min;
        p = Number(
          prompt("Please enter value from 0 to 6: to select data set")
        );
      } while (k1 == p);
      k2 = p;
    } else if (repeat == 3) {
      do {
        // p = Math.floor(Math.random() * (max - min + 1)) + min;
        p = Number(
          prompt("Please enter value from 0 to 6: to select data set")
        );
      } while (k2 == p || k1 == p);
      k3 = p;
    } else if (repeat == 4) {
      do {
        // p = Math.floor(Math.random() * (max - min + 1)) + min;
        p = Number(
          prompt("Please enter value from 0 to 6: to select data set")
        );
      } while (k1 == p || k2 == p || k3 == p);
    }
    if (dia == "50mm") {
      if (repeat == 1) {
        gx1 = mano50[3][p];
        gy1 = mano50[5][p];
      } else if (repeat == 2) {
        gx2 = mano50[3][p];
        gy2 = mano50[5][p];
      } else if (repeat == 3) {
        gx3 = mano50[3][p];
        gy3 = mano50[5][p];
      } else if (repeat == 4) {
        gx4 = mano50[3][p];
        gy4 = mano50[5][p];
      }
    } else if (dia == "40mm") {
      if (repeat == 1) {
        gx1 = mano40[3][p];
        gy1 = mano40[5][p];
      } else if (repeat == 2) {
        gx2 = mano40[3][p];
        gy2 = mano40[5][p];
      } else if (repeat == 3) {
        gx3 = mano40[3][p];
        gy3 = mano40[5][p];
      } else if (repeat == 4) {
        gx4 = mano40[3][p];
        gy4 = mano40[5][p];
      }
    } else if (dia == "20mm") {
      if (repeat == 1) {
        gx1 = mano20[3][p];
        gy1 = mano20[5][p];
      } else if (repeat == 2) {
        gx2 = mano20[3][p];
        gy2 = mano20[5][p];
      } else if (repeat == 3) {
        gx3 = mano20[3][p];
        gy3 = mano20[5][p];
      } else if (repeat == 4) {
        gx4 = mano20[3][p];
        gy4 = mano20[5][p];
      }
    }
    document.getElementById("trial").style =
      "visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
    document.getElementById("trial").innerHTML = "Trial : " + repeat;
    if (repeat <= 8 && repeat > 1) {
      refresh();
      document.getElementById("70").style.visibility = "hidden";
      document.getElementById("70a").style.visibility = "hidden";
      document.getElementById("70b").style.visibility = "hidden";
      document.getElementById("71").style.visibility = "hidden";
      document.getElementById("73g").style.visibility = "hidden";
      document.getElementById("2a").style.visibility = "visible";
      document.getElementById("pvalve").style.visibility = "visible";
      document.getElementById("meter").style.visibility = "visible";
    }
    document.getElementById("nextButton").style.visibility = "hidden";
    document.getElementById("s1").style.visibility = "hidden";
    document.getElementById("s2").style.visibility = "hidden";

    myInt = setInterval(function () {
      animatearrow();
    }, 500);

    document.getElementById("arr").style =
      "visibility:visible ;position:absolute; left: 340px; top: 450px; height: 30px; z-index: 10;";
    document.getElementById("arr").style.WebkitTransform = "rotate(-90deg)";
    // Code for IE9
    document.getElementById("arr").style.msTransform = "rotate(-90deg)";
    // Standard syntax
    document.getElementById("arr").style.transform = "rotate(-90deg)";
    document.getElementById("pvalve").onclick = function () {
      step2();
    };
  } else if (simsubscreennum == 3) {
    if (repeat <= 4 && repeat >= 1) {
      refresh();
      document.getElementById("b5").style.visibility = "visible";
      document.getElementById("b6").style.visibility = "visible";
      document.getElementById("meter3a").style.visibility = "visible";
      document.getElementById("p3").style.visibility = "visible";
      document.getElementById("lw").style.visibility = "visible";
      document.getElementById("rw").style.visibility = "visible";
    }
    document.getElementById("f50").style.visibility = "hidden";
    document.getElementById("f40").style.visibility = "hidden";
    document.getElementById("f20").style.visibility = "hidden";
    document.getElementById("b3").style.visibility = "hidden";
    document.getElementById("b4").style.visibility = "hidden";
    document.getElementById("meter2").style.visibility = "hidden";
    document.getElementById("meter").style.visibility = "hidden";
    document.getElementById("p2").style.visibility = "hidden";

    if (dia == "50mm") {
      document.getElementById("fw250").style.visibility = "hidden";
      document.getElementById("flow350").style.visibility = "visible";
    } else if (dia == "40mm") {
      document.getElementById("fw240").style.visibility = "hidden";
      document.getElementById("flow340").style.visibility = "visible";
    } else if (dia == "20mm") {
      document.getElementById("fw220").style.visibility = "hidden";
      document.getElementById("flow320").style.visibility = "visible";
    }

    myInt = setInterval(function () {
      animatearrow();
    }, 500);

    document.getElementById("arr").style =
      "visibility:visible ;position:absolute;  left: 575px; top: 170.75px;   height: 30px; z-index: 10;";
    document.getElementById("arr").style.WebkitTransform = "rotate(35deg)";
    // Code for IE9
    document.getElementById("arr").style.msTransform = "rotate(35deg)";
    // Standard syntax
    document.getElementById("arr").style.transform = "rotate(35deg)";
    document.getElementById("b5").onclick = function () {
      step3a();
    };
  } else if (simsubscreennum == 4) {
    if (repeat <= 4 && repeat >= 1) {
      refresh();
      if (dia == "50mm") {
        document.getElementById("d1").innerHTML = "d1&nbsp;=&nbsp;5cm";
        document.getElementById("d2").innerHTML = "d2&nbsp;=&nbsp;2.72cm";
      } else if (dia == "40mm") {
        document.getElementById("d1a").innerHTML = "d1&nbsp;=&nbsp;4cm";
        document.getElementById("d2a").innerHTML = "d2&nbsp;=&nbsp;2.366cm";
      } else if (dia == "20mm") {
        document.getElementById("d1b").innerHTML = "d1&nbsp;=&nbsp;2cm";
        document.getElementById("d2b").innerHTML = "d2&nbsp;=&nbsp;1.36cm";
      }
    }
    document.getElementById("fw350").style.visibility = "hidden";
    document.getElementById("fw340").style.visibility = "hidden";
    document.getElementById("fw320").style.visibility = "hidden";
    document.getElementById("b7").style.visibility = "hidden";
    document.getElementById("b8").style.visibility = "hidden";
    document.getElementById("meter3a").style.visibility = "hidden";
    document.getElementById("p4").style.visibility = "hidden";
    document.getElementById("wr1").style.visibility = "hidden";
    document.getElementById("wr2").style.visibility = "hidden";
    document.getElementById("mano").style.visibility = "hidden";

    if (dia == "50mm") {
      document.getElementById("fw350").style.visibility = "hidden";
      document.getElementById("fw450").style.visibility = "visible";
    } else if (dia == "40mm") {
      document.getElementById("fw340").style.visibility = "hidden";
      document.getElementById("fw440").style.visibility = "visible";
    } else if (dia == "20mm") {
      document.getElementById("fw320").style.visibility = "hidden";
      document.getElementById("fw420").style.visibility = "visible";
    }

    if (dia == "50mm") {
      document.getElementById("flow").style =
        "position:absolute;left:10px;top:348.5px;visibility:visible;";
    } else if (dia == "40mm") {
      document.getElementById("flow").style.visibility = "visible";
    } else if (dia == "20mm") {
      document.getElementById("flow").style =
        "position:absolute;left:10px;top:348.5px;visibility:visible;";
    }

    document.getElementById("v").style.visibility = "visible";
    document.getElementById("vwater").style.visibility = "visible";
    document.getElementById("vwater").style.animation = "vwater 5s 1 forwards";
    setTimeout(function () {
      document.getElementById("nextButton").style.visibility = "visible";
    }, 3500);
  } else if (simsubscreennum == 5) {
    if (repeat <= 4 && repeat >= 1) {
      refresh();
      document.getElementById("circle5").style.visibility = "visible";
    }
    document.getElementById("v").style.visibility = "hidden";
    document.getElementById("vwater").style.visibility = "hidden";
    myInt = setInterval(function () {
      animatearrow();
    }, 500);

    document.getElementById("arr").style =
      "visibility:visible ;position:absolute;  left: 20px; top: 340px;   height: 30px; z-index: 10;";
    document.getElementById("arr").style.WebkitTransform = "rotate(35deg)";
    // Code for IE9
    document.getElementById("arr").style.msTransform = "rotate(35deg)";
    // Standard syntax
    document.getElementById("arr").style.transform = "rotate(35deg)";
    document.getElementById("circle5").onclick = function () {
      step5a();
    };
  } else if (simsubscreennum == 6) {
    document.getElementById("time").style.visibility = "hidden";
    document.getElementById("fw450").style.visibility = "hidden";
    document.getElementById("fw440").style.visibility = "hidden";
    document.getElementById("fw420").style.visibility = "hidden";
    document.getElementById("flow550").style.visibility = "hidden";
    document.getElementById("flow540").style.visibility = "hidden";
    document.getElementById("flow520").style.visibility = "hidden";
    document.getElementById("needle").style.visibility = "hidden";
    document.getElementById("swatch").style.visibility = "hidden";
    document.getElementById("wr5").style.visibility = "hidden";
    document.getElementById("mtube5").style.visibility = "hidden";
    document.getElementById("70").style.visibility = "visible";
    document.getElementById("70a").style.visibility = "visible";
    document.getElementById("71").style.visibility = "visible";
    document.getElementById("70b").style.visibility = "visible";
    document.getElementById("73g").style.visibility = "visible";
    if (dia == "50mm") {
      document.getElementById("70c").innerHTML = "d<sub>1</sub>=5cm ";
      document.getElementById("70d").innerHTML = "d<sub>2</sub>=2.72cm";
      document.getElementById("70").innerHTML =
        "Area A<sub>1</sub>=19.625cm<sup>2</sup> ";
      document.getElementById("70a").innerHTML =
        "Area A<sub>2</sub>=5.81cm<sup>2</sup>";
      document.getElementById("72").innerHTML =
        "Time taken (t)=" + mano50[4][p] + "sec";
      document.getElementById("73").innerHTML =
        "Head Loss (H)=" +
        (12.6 * (mano50[0][p] - mano50[1][p])).toFixed(2) +
        "cm";
      qactVal = mano50[5][p];
      document.getElementById("74").innerHTML = "Q<sub>act</sub> = ";
      idInput = document.getElementById("74");
      userCalculation(idInput);
      // document.getElementById('74').innerHTML="Q<sub>act</sub>(Axh/t)=&nbsp"+mano50[5][p]+"cm<sup>3</sup>/s";
      // document.getElementById('75').innerHTML="Q<sub>th</sub>="+mano50[6][p].toFixed(2)+"cm<sup>3</sup>/s";
      // document.getElementById('76').innerHTML="C<sub>d</sub>(Q<sub>act</sub>/Q<sub>th</sub>)="+mano50[7][p];
    } else if (dia == "40mm") {
      document.getElementById("70c").innerHTML = "d<sub>1</sub>=4cm ";
      document.getElementById("70d").innerHTML = "d<sub>2</sub>=2.366cm";
      document.getElementById("70").innerHTML =
        "Area A<sub>1</sub>=12.568cm<sup>2</sup> ";
      document.getElementById("70a").innerHTML =
        "Area A<sub>2</sub>=4.397cm<sup>2</sup>";
      document.getElementById("72").innerHTML =
        "Time taken (t)=" + mano40[4][p] + "sec";
      document.getElementById("73").innerHTML =
        "Head Loss (H)=" +
        (12.6 * (mano40[0][p] - mano40[1][p])).toFixed(2) +
        "cm";
      qactVal = mano40[5][p];
      document.getElementById("74").innerHTML = "Q<sub>act</sub> = ";
      idInput = document.getElementById("74");
      userCalculation(idInput);
      // document.getElementById('74').innerHTML="Q<sub>act</sub>(Axh/t)=&nbsp"+mano40[5][p]+"cm<sup>3</sup>/s";
      // document.getElementById('75').innerHTML="Q<sub>th</sub>="+mano40[6][p].toFixed(2)+"cm<sup>3</sup>/s";
      // document.getElementById('76').innerHTML="C<sub>d</sub>(Q<sub>act</sub>/Q<sub>th</sub>)="+mano40[7][p];
    } else if (dia == "20mm") {
      document.getElementById("70c").innerHTML = "d<sub>1</sub>=2cm ";
      document.getElementById("70d").innerHTML = "d<sub>2</sub>=1.36cm";
      document.getElementById("70").innerHTML =
        "Area A<sub>1</sub>=3.14cm<sup>2</sup> ";
      document.getElementById("70a").innerHTML =
        "Area A<sub>2</sub>=1.45cm<sup>2</sup>";
      document.getElementById("72").innerHTML =
        "Time taken (t)=" + mano20[4][p] + "sec";
      document.getElementById("73").innerHTML =
        "Head Loss (H)=" +
        (12.6 * (mano20[0][p] - mano20[1][p])).toFixed(2) +
        "cm";
      qactVal = mano20[5][p];
      document.getElementById("74").innerHTML = "Q<sub>act</sub> = ";
      idInput = document.getElementById("74");
      userCalculation(idInput);
    }
  } else if (simsubscreennum == 7) {
    document.getElementById("trial").style.visibility = "hidden";
    document.getElementById("70").style.visibility = "hidden";
    document.getElementById("70a").style.visibility = "hidden";
    document.getElementById("71").style.visibility = "hidden";
    document.getElementById("70b").style.visibility = "hidden";
    document.getElementById("72").style.visibility = "hidden";
    document.getElementById("73").style.visibility = "hidden";
    document.getElementById("73g").style.visibility = "hidden";
    document.getElementById("74").style.visibility = "hidden";
    document.getElementById("75").style.visibility = "hidden";
    document.getElementById("76").style.visibility = "hidden";
    graph = [
      [gx1, gy1],
      [gx2, gy2],
      [gx3, gy3],
      [gx4, gy4],
    ];
    graph.sort(function (x, y) {
      return x[0] - y[0];
    });
    if (dia == "50mm") {
      document.getElementById("step7text1").onclick = function () {
        step750();
      };
    } else if (dia == "40mm") {
      document.getElementById("step7text1").onclick = function () {
        step740();
      };
    } else if (dia == "20mm") {
      document.getElementById("step7text1").onclick = function () {
        step720();
      };
    }
  } else if (simsubscreennum == 8) {
  }
}

function step2() {
  myStopFunction();
  document.getElementById("pvalve").style.visibility = "hidden";
  document.getElementById("hv2").style.visibility = "visible";
  document.getElementById("pole2").style.visibility = "visible";
  document.getElementById("hv2").style.transformOrigin = "13% 14%";
  document.getElementById("hv2").style.animation = "pipes-2 1.2s 1 forwards";
  setTimeout(function () {
    if (dia == "50mm") {
      document.getElementById("2a").style.visibility = "hidden";
      document.getElementById("meter1").style.visibility = "visible";
      document.getElementById("f50").style.visibility = "visible";
    } else if (dia == "40mm") {
      document.getElementById("2a").style.visibility = "hidden";
      document.getElementById("f40").style.visibility = "visible";
    } else if (dia == "20mm") {
      document.getElementById("2a").style.visibility = "hidden";
      document.getElementById("f20").style.visibility = "visible";
    }
    document.getElementById("hv2").style.visibility = "hidden";
    document.getElementById("pole2").style.visibility = "hidden";
    step21();
  }, 1500);
}

function step21() {
  setTimeout(function () {
    myInt = setInterval(function () {
      animatearrow();
    }, 500);
    if (dia == "50mm") {
      document.getElementById("arr").style =
        "visibility:visible ;position:absolute;  left: 190px; top: 200px;   height: 20px; z-index: 10;";
      document.getElementById("arr").style.WebkitTransform = "rotate(90deg)";
      // Code for IE9
      document.getElementById("arr").style.msTransform = "rotate(90deg)";
      // Standard syntax
      document.getElementById("arr").style.transform = "rotate(90deg)";

      document.getElementById("circle2").style =
        "position:absolute;cursor:zoom-in;visibility:visible;left: 132px; top: 178px;";
      document.getElementById("circle2").onclick = function () {
        step22();
      };
    } else if (dia == "40mm") {
      document.getElementById("arr").style =
        "visibility:visible ;position:absolute;  left: 190px; top: 264px;   height: 20px; z-index: 10;";
      document.getElementById("arr").style.WebkitTransform = "rotate(90deg)";
      // Code for IE9
      document.getElementById("arr").style.msTransform = "rotate(90deg)";
      // Standard syntax
      document.getElementById("arr").style.transform = "rotate(90deg)";

      document.getElementById("circle2").style =
        "position:absolute;visibility:visible;cursor:zoom-in; left: 132px; top: 236px;";
      document.getElementById("circle2").onclick = function () {
        step22();
      };
    } else if (dia == "20mm") {
      document.getElementById("arr").style =
        "visibility:visible ;position:absolute;  left: 190px; top: 315px;   height: 20px; z-index: 10;";
      document.getElementById("arr").style.WebkitTransform = "rotate(90deg)";
      // Code for IE9
      document.getElementById("arr").style.msTransform = "rotate(90deg)";
      // Standard syntax
      document.getElementById("arr").style.transform = "rotate(90deg)";

      document.getElementById("circle2").style =
        "position:absolute;visibility:visible;cursor:zoom-in; left: 132px; top: 288.5px;";
      document.getElementById("circle2").onclick = function () {
        step22();
      };
    }
  }, 1500);
}
function step22() {
  myStopFunction();
  // document.getElementById('circle23').style.visibility="hidden";
  document.getElementById("circle2").style.visibility = "hidden";
  document.getElementById("hv21").style.visibility = "visible";
  document.getElementById("pole21").style.visibility = "visible";
  document.getElementById("hv21").style.transformOrigin = "13% 14%";
  document.getElementById("hv21").style.animation = "pipes-2 1.2s 1 forwards";
  setTimeout(function () {
    if (dia == "50mm") {
      document.getElementById("f50").style.visibility = "hidden";
      document.getElementById("fw250").style.visibility = "visible";
    } else if (dia == "40mm") {
      document.getElementById("f40").style.visibility = "hidden";
      document.getElementById("fw240").style.visibility = "visible";
    } else if (dia == "20mm") {
      document.getElementById("f20").style.visibility = "hidden";
      document.getElementById("fw220").style.visibility = "visible";
    }
    step2a();
  }, 2500);
}

function step2a() {
  document.getElementById("circle2").style.visibility = "hidden";
  document.getElementById("pole21").style.visibility = "hidden";
  document.getElementById("hv21").style.visibility = "hidden";

  myInt = setInterval(function () {
    animatearrow();
  }, 500);
  document.getElementById("arr").style =
    "visibility:visible ;position:absolute;  left: 225px; top: 180.75px;  height: 30px; z-index: 10;";
  document.getElementById("arr").style.WebkitTransform = "rotate(35deg)";
  // Code for IE9
  document.getElementById("arr").style.msTransform = "rotate(35deg)";
  // Standard syntax
  document.getElementById("arr").style.transform = "rotate(35deg)";
  if (dia == "50mm") {
    document.getElementById("meter1").onclick = function () {
      step2b();
    };
  } else
    document.getElementById("meter").onclick = function () {
      step2b();
    };
}

function step2b() {
  myStopFunction();
  if (dia == "50mm") {
    document.getElementById("meter1").style.visibility = "hidden";
  }
  document.getElementById("meter").style.visibility = "hidden";
  document.getElementById("meter2").style.visibility = "visible";
  document.getElementById("b1").style.visibility = "visible";
  document.getElementById("b2").style.visibility = "visible";
  document.getElementById("p1").style.visibility = "visible";
  myInt = setInterval(function () {
    animatearrow();
  }, 500);
  document.getElementById("arr").style =
    "visibility:visible ;position:absolute;  left: 590px; top: 180.75px;  height: 30px; z-index: 10;";
  document.getElementById("arr").style.WebkitTransform = "rotate(35deg)";
  // Code for IE9
  document.getElementById("arr").style.msTransform = "rotate(35deg)";
  // Standard syntax
  document.getElementById("arr").style.transform = "rotate(35deg)";
  document.getElementById("b1").onclick = function () {
    step2c();
  };
}

function step2c() {
  myStopFunction();
  document.getElementById("b1").style.visibility = "hidden";
  document.getElementById("b3").style.visibility = "visible";
  myInt = setInterval(function () {
    animatearrow();
  }, 500);
  document.getElementById("arr").style =
    "visibility:visible ;position:absolute;  left: 652px; top: 180.75px;  height: 30px; z-index: 10;";
  document.getElementById("arr").style.WebkitTransform = "rotate(-215deg)";
  // Code for IE9
  document.getElementById("arr").style.msTransform = "rotate(-215deg)";
  // Standard syntax
  document.getElementById("arr").style.transform = "rotate(-215deg)";
  document.getElementById("b2").onclick = function () {
    step2d();
  };
}

function step2d() {
  myStopFunction();
  document.getElementById("b2").style.visibility = "hidden";
  document.getElementById("p1").style.visibility = "hidden";
  document.getElementById("b4").style.visibility = "visible";
  document.getElementById("p2").style.visibility = "visible";
  document.getElementById("nextButton").style.visibility = "visible";
}

function step3a() {
  myStopFunction();
  document.getElementById("b5").style.visibility = "hidden";
  document.getElementById("b7").style.visibility = "visible";
  myInt = setInterval(function () {
    animatearrow();
  }, 500);
  document.getElementById("arr").style =
    "visibility:visible ;position:absolute;  left: 668px; top: 165.75px;  height: 30px; z-index: 10;";
  document.getElementById("arr").style.WebkitTransform = "rotate(-215deg)";
  // Code for IE9
  document.getElementById("arr").style.msTransform = "rotate(-215deg)";
  // Standard syntax
  document.getElementById("arr").style.transform = "rotate(-215deg)";
  document.getElementById("b6").onclick = function () {
    step3b();
  };
}

function step3b() {
  myStopFunction();

  if (dia == "50mm") {
    document.getElementById("flow350").style.visibility = "hidden";
    document.getElementById("fw350").style.visibility = "visible";
  } else if (dia == "40mm") {
    document.getElementById("flow340").style.visibility = "hidden";
    document.getElementById("fw340").style.visibility = "visible";
  } else if (dia == "20mm") {
    document.getElementById("flow320").style.visibility = "hidden";
    document.getElementById("fw320").style.visibility = "visible";
  }
  document.getElementById("b6").style.visibility = "hidden";
  document.getElementById("p3").style.visibility = "hidden";
  document.getElementById("b8").style.visibility = "visible";
  document.getElementById("p4").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("p4").style.visibility = "hidden";
    document.getElementById("meter3a").style.visibility = "hidden";
    document.getElementById("b7").style.visibility = "hidden";
    document.getElementById("b8").style.visibility = "hidden";
    document.getElementById("hv34").style.visibility = "hidden";
    document.getElementById("pole34").style.visibility = "hidden";
    step3e();
  }, 1800);
}

function step3e() {
  document.getElementById("mano").style.visibility = "visible";
  document.getElementById("wr1").style.visibility = "visible";
  document.getElementById("wr2").style.visibility = "visible";

  document.getElementById("wr1").style.transformOrigin = "100% 80%";
  document.getElementById("wr1").style.animation = "water-1 2.5s 1 forwards";

  document.getElementById("wr2").style.transformOrigin = "100% 80%";
  document.getElementById("wr2").style.animation = "water-1 2.5s 1 forwards";

  setTimeout(function () {
    if (dia == "50mm") {
      document.getElementById("lw").innerHTML =
        "Left Limb Reading (LL)&nbsp=&nbsp" + mano50[0][p] + "cm";
      document.getElementById("rw").innerHTML =
        "Right Limb Reading (RL)&nbsp=&nbsp" + mano50[1][p] + "cm";
      HVal = 12.6 * (mano50[0][p] - mano50[1][p]);
      document.getElementById("rlh").innerHTML = "Head Loss (H) = ";
      setTimeout(function () {
        idInput = document.getElementById("rlh");
        userCalculation(idInput);
      }, 1000);
      // document.getElementById('rlh').innerHTML="Head Loss(12.6*(LL-RL))&nbsp=&nbsp"+(12.6*(mano50[0][p]-mano50[1][p])).toFixed(2)+"cm";
    } else if (dia == "40mm") {
      document.getElementById("lw").innerHTML =
        "Left Limb Reading (LL)&nbsp=&nbsp" + mano40[0][p] + "cm";
      document.getElementById("rw").innerHTML =
        "Right Limb Reading (RL)&nbsp=&nbsp" + mano40[1][p] + "cm";
      HVal = 12.6 * (mano40[0][p] - mano40[1][p]);
      document.getElementById("rlh").innerHTML = "Head Loss (H) = ";
      setTimeout(function () {
        idInput = document.getElementById("rlh");
        userCalculation(idInput);
      }, 1000);
      // document.getElementById('rlh').innerHTML="Head Loss(12.6*(LL-RL))&nbsp=&nbsp"+(12.6*(mano40[0][p]-mano40[1][p])).toFixed(2)+"cm";
    } else if (dia == "20mm") {
      document.getElementById("lw").innerHTML =
        "Left Limb Reading (LL)L&nbsp=&nbsp" + mano20[0][p] + "cm";
      document.getElementById("rw").innerHTML =
        "Right Limb Reading (RL)&nbsp=&nbsp" + mano20[1][p] + "cm";
      HVal = 12.6 * (mano20[0][p] - mano20[1][p]);
      document.getElementById("rlh").innerHTML = "Head Loss (H) = ";
      setTimeout(function () {
        idInput = document.getElementById("rlh");
        userCalculation(idInput);
      }, 1000);
      // document.getElementById('rlh').innerHTML="Head Loss(12.6*(LL-RL))&nbsp=&nbsp"+(12.6*(mano40[0][p]-mano40[1][p])).toFixed(2)+"cm";
    }
    //    document.getElementById('nextButton').style.visibility="visible";
  }, 2500);
}

function step5a() {
  myStopFunction();
  document.getElementById("circle5").style.visibility = "hidden";
  document.getElementById("flow").style.visibility = "hidden";
  document.getElementById("mtube5").style.visibility = "visible";
  document.getElementById("swatch").style.visibility = "visible";
  document.getElementById("needle").style.visibility = "visible";
  document.getElementById("wr5").style.visibility = "visible";
  setTimeout(function () {
    if (dia == "50mm") {
      document.getElementById("flow550").style.visibility = "visible";
      document.getElementById("fw550").style.visibility = "hidden";
    } else if (dia == "40mm") {
      document.getElementById("flow540").style.visibility = "visible";
      document.getElementById("fw540").style.visibility = "hidden";
    } else if (dia == "20mm") {
      document.getElementById("flow520").style.visibility = "visibile";
      document.getElementById("fw520").style.visibility = "hidden";
    }

    document.getElementById("wr5").style.animation = "water0 2.5s forwards";
    document.getElementById("needle").style.transformOrigin = "50% 90%";
    document.getElementById("needle").style.animation =
      "valveturn-5 2.5s forwards";
    setTimeout(function () {
      if (dia == "50mm") {
        document.getElementById("time").style.visibility = "visible";
        document.getElementById("time").innerHTML =
          "Time required by water to fill 5cm height&nbsp=&nbsp" +
          mano50[4][p] +
          "s";
      } else if (dia == "40mm") {
        document.getElementById("time").style.visibility = "visible";
        document.getElementById("time").innerHTML =
          "Time required by water to fill 5cm height&nbsp=&nbsp" +
          mano40[4][p] +
          "s";
      } else if (dia == "20mm") {
        document.getElementById("time").style.visibility = "visible";
        document.getElementById("time").innerHTML =
          "Time required by water to fill 5cm height&nbsp=&nbsp" +
          mano20[4][p] +
          "s";
      }
      document.getElementById("nextButton").style.visibility = "visible";
    }, 1500);
  }, 1000);
}

function step6() {
  myStopFunction();
}

function step7Next() {
  if (repeat >= 1 && repeat < 4) {
    simsubscreennum = 1;
    document.getElementById("nextButton").style.visibility = "visible";
  } else if (repeat == 4) {
    simsubscreennum = 6;
    document.getElementById("nextButton").style.visibility = "visible";
  }
}
function step750() {
  $("#chartContainer").ejChart({
    primaryXAxis: {
      title: { text: "H" },
      labelFormat: "{value}",
      // range: { min: 1000, max: 4000, interval: 500},
      range: { min: 0, max: 500, interval: 100 },
    },
    primaryYAxis: {
      title: { text: "Qact" },
      labelFormat: "{value}",
      // range: { min: 100, max: 400, interval: 50 },
      range: { min: 100, max: 5000, interval: 500 },
    },

    series: [
      {
        points: [
          { x: graph[0][0], y: graph[0][1] },
          { x: graph[1][0], y: graph[1][1] },
          { x: graph[2][0], y: graph[2][1] },
          { x: graph[3][0], y: graph[3][1] },
        ],
        type: "spline",
        fill: "#0066FF",
        border: { width: 5 },
        tooltip: { visible: true },
        marker: {
          shape: "circle",
          size: {
            height: 5,
            width: 5,
          },
          visible: true,
        },
        enableAnimation: true,
      },
    ],

    load: "loadTheme",
    isResponsive: true,

    legend: { visible: false },
  });
}

function step740() {
  $("#chartContainer").ejChart({
    primaryXAxis: {
      title: { text: "H" },
      labelFormat: "{value}",
      // range: { min: 1000, max: 4000, interval: 500},
      range: { min: 0, max: 500, interval: 100 },
    },
    primaryYAxis: {
      title: { text: "Qact" },
      labelFormat: "{value}",
      // range: { min: 100, max: 400, interval: 50 },
      range: { min: 100, max: 5000, interval: 500 },
    },

    series: [
      {
        points: [
          { x: graph[0][0], y: graph[0][1] },
          { x: graph[1][0], y: graph[1][1] },
          { x: graph[2][0], y: graph[2][1] },
          { x: graph[3][0], y: graph[3][1] },
        ],
        type: "spline",
        fill: "#0066FF",
        border: { width: 5 },
        tooltip: { visible: true },
        marker: {
          shape: "circle",
          size: {
            height: 5,
            width: 5,
          },
          visible: true,
        },
        enableAnimation: true,
      },
    ],

    load: "loadTheme",
    isResponsive: true,

    legend: { visible: false },
  });
}

function step720() {
  $("#chartContainer").ejChart({
    primaryXAxis: {
      title: { text: "H" },
      labelFormat: "{value}",
      range: { min: 0, max: 500, interval: 100 },
    },
    primaryYAxis: {
      title: { text: "Qact" },
      labelFormat: "{value}",
      range: { min: 100, max: 5000, interval: 500 },

      // range: { min: 100, max: 400, interval: 50 },
    },

    series: [
      {
        points: [
          { x: graph[0][0], y: graph[0][1] },
          { x: graph[1][0], y: graph[1][1] },
          { x: graph[2][0], y: graph[2][1] },
          { x: graph[3][0], y: graph[3][1] },
        ],
        type: "line",
        fill: "#0066FF",
        border: { width: 5 },
        tooltip: { visible: true },
        marker: {
          shape: "circle",
          size: {
            height: 5,
            width: 5,
          },
          visible: true,
        },
        enableAnimation: true,
      },
    ],

    load: "loadTheme",
    isResponsive: true,
    legend: { visible: false },
  });
}

function refresh() {
  document.getElementById("wr1").style.transformOrigin = "";
  document.getElementById("wr1").style.animation = "";
  document.getElementById("wr2").style.transformOrigin = "";
  document.getElementById("wr2").style.animation = "";
  document.getElementById("wr5").style.transformOrigin = "";
  document.getElementById("wr5").style.animation = "";
  document.getElementById("needle").style.animation = "";
  document.getElementById("hv2").style.transformOrigin = "";
  document.getElementById("hv2").style.animation = "";
  document.getElementById("hv21").style.transformOrigin = "";
  document.getElementById("hv21").style.animation = "";
  document.getElementById("hv34").style.transformOrigin = "";
  document.getElementById("hv34").style.animation = "";
  document.getElementById("flow").style.transformOrigin = "";
  document.getElementById("vwater").style.transformOrigin = "";
  document.getElementById("vwater").style.animation = "";
  document.getElementById("arr").style.transformOrigin = "";
  document.getElementById("arr").style.animation = "";
  document.getElementById("d1").innerHTML = "";
  document.getElementById("d1a").innerHTML = "";
  document.getElementById("d1b").innerHTML = "";
  document.getElementById("d2").innerHTML = "";
  document.getElementById("d2a").innerHTML = "";
  document.getElementById("d2b").innerHTML = "";
  document.getElementById("lw").innerHTML = "";
  document.getElementById("rw").innerHTML = "";
  document.getElementById("rlh").innerHTML = "";
  document.getElementById("72").innerHTML = "";
  document.getElementById("73").innerHTML = "";
  document.getElementById("74").innerHTML = "";
  document.getElementById("75").innerHTML = "";
  document.getElementById("76").innerHTML = "";
  document.getElementById("meter1").onclick = "";
  document.getElementById("meter").onclick = "";
  document.getElementById("circle2").onclick = "";
  document.getElementById("b6").onclick = "";
  document.getElementById("b2").onclick = "";
}

//function to round off number n to d decimal places
function roundd(n, d) {
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
}
