const mtrUpdate = async function (line, station) {
  fetch(
    `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}&lang=tc`
  )
    .then((result) => result.json())
    .then((result) => {
      var currentdate = new Date();
      var datetime =
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1 < 10
          ? "0" + (currentdate.getMonth() + 1)
          : currentdate.getMonth() + 1) +
        "-" +
        (currentdate.getDate() < 10
          ? "0" + currentdate.getDate()
          : currentdate.getDate()) +
        " " +
        (currentdate.getHours() < 10
          ? "0" + currentdate.getHours()
          : currentdate.getHours()) +
        ":" +
        (currentdate.getMinutes() < 10
          ? "0" + currentdate.getMinutes()
          : currentdate.getMinutes()) +
        ":" +
        (currentdate.getSeconds() < 10
          ? "0" + currentdate.getSeconds()
          : currentdate.getSeconds());

      document.getElementById("time").innerHTML = datetime;
      for (var i = 0; i < 4; i++) {
        document.getElementById(`up-train${i + 1}-time`).innerHTML = "";
        document.getElementById(`up-train${i + 1}-dest`).innerHTML = "";
        document.getElementById(`up-train${i + 1}-plat`).innerHTML = "";
        document.getElementById(`up-train${i + 1}-ttnt`).innerHTML = "";
        document.getElementById(`down-train${i + 1}-time`).innerHTML = "";
        document.getElementById(`down-train${i + 1}-dest`).innerHTML = "";
        document.getElementById(`down-train${i + 1}-plat`).innerHTML = "";
        document.getElementById(`down-train${i + 1}-ttnt`).innerHTML = "";
      }

      var downdata = result["data"][`${line}-${station}`]["DOWN"] ?? null;
      var updata = result["data"][`${line}-${station}`]["UP"] ?? null;
      if (updata !== null) {
        for (var i = 0; i < updata.length; i++) {
          document.getElementById(`up-train${i + 1}-time`).innerHTML =
            updata[i]["time"];
          document.getElementById(`up-train${i + 1}-dest`).innerHTML =
            eval(line)[updata[i]["dest"]];
          document.getElementById(`up-train${i + 1}-plat`).innerHTML =
            updata[i]["plat"];
          document.getElementById(`up-train${i + 1}-ttnt`).innerHTML =
            updata[i]["ttnt"];
        }
      } else {
        for (var i = 0; i < 4; i++) {
          document.getElementById(`up-train${i + 1}-time`).innerHTML = "";
          document.getElementById(`up-train${i + 1}-dest`).innerHTML = "";
          document.getElementById(`up-train${i + 1}-plat`).innerHTML = "";
          document.getElementById(`up-train${i + 1}-ttnt`).innerHTML = "";
        }
      }

      if (downdata !== null) {
        for (var i = 0; i < downdata.length; i++) {
          document.getElementById(`down-train${i + 1}-time`).innerHTML =
            downdata[i]["time"];
          document.getElementById(`down-train${i + 1}-dest`).innerHTML =
            eval(line)[downdata[i]["dest"]];
          document.getElementById(`down-train${i + 1}-plat`).innerHTML =
            downdata[i]["plat"];
          document.getElementById(`down-train${i + 1}-ttnt`).innerHTML =
            downdata[i]["ttnt"];
        }
      } else {
        for (var i = 0; i < 4; i++) {
          document.getElementById(`down-train${i + 1}-time`).innerHTML = "";
          document.getElementById(`down-train${i + 1}-dest`).innerHTML = "";
          document.getElementById(`down-train${i + 1}-plat`).innerHTML = "";
          document.getElementById(`down-train${i + 1}-ttnt`).innerHTML = "";
        }
      }
    });
};

window.onload = function () {
  var select = document.getElementById("line");

  function subMenu() {
    var stationDropdown = document.getElementById("station");
    var submitBtn = document.getElementById("submitBtn");
    if (this.value) {
      stationDropdown.removeAttribute("hidden");
      submitBtn.removeAttribute("hidden");

      for (var i = stationDropdown.length - 1; i >= 0; i--) {
        stationDropdown.remove(i);
      }

      stations = eval(this.value);
      for (var station in stations) {
        var opt = document.createElement("option");
        opt.value = station;
        opt.innerHTML = stations[station];
        stationDropdown.appendChild(opt);
      }
    } else {
      stationDropdown.setAttribute("hidden", "");
      submitBtn.setAttribute("hidden", "");
    }
  }

  if (select) {
    select.addEventListener("change", subMenu, false);
  }
};

var myInterval = null;

const getMTRUpdate = async function () {
  myInterval !== null ? clearInterval(myInterval) : (myInterval = null);
  var line = document.getElementById("line").value;
  var station = document.getElementById("station").value;
  document.getElementById("sta_name").innerHTML =
    eval(line)[station].toUpperCase();
  myInterval = setInterval(mtrUpdate, 1000, line, station);
};

const AEL = {
  HOK: "香港",
  KOW: "九龍",
  TSY: "青衣",
  AIR: "機場",
  AWE: "博覽館",
};

const TCL = {
  HOK: "香港",
  KOW: "九龍",
  OLY: "奧運",
  NAC: "南昌",
  LAK: "荔景",
  TSY: "青衣",
  SUN: "欣澳",
  TUC: "東涌",
};

const TML = {
  WKS: "烏溪沙", 
  MOS: "馬鞍山", 
  HEO: "恆安", 
  TSH: "大水坑", 
  SHM: "石門", 
  CIO: "第一城", 
  STW: "沙田圍", 
  CKT: "車公廟", 
  TAW: "大圍", 
  HIK: "顯徑", 
  DIH: "鑽石山", 
  KAT: "啟德", 
  SUW: "宋皇臺", 
  TKW: "土瓜灣", 
  HOM: "何文田", 
  HUH: "紅磡", 
  ETS: "尖東", 
  AUS: "柯士甸", 
  NAC: "南昌", 
  MEF: "美孚", 
  TWW: "荃灣西", 
  KSR: "錦上路", 
  YUL: "元朗", 
  LOP: "朗屏", 
  TIS: "天水圍", 
  SIH: "兆康",
  TUM: "屯門",
};

const TKL = {
  NOP: "北角",
  QUB: "鰂魚涌",
  YAT: "油塘",
  TIK: "調景嶺",
  TKO: "將軍澳",
  LHP: "康城",
  HAH: "坑口",
  POA: "寶琳",
};

const EAL = {
  ADM: "金鐘",
  EXC: "會展",
  HUH: "紅磡",
  MKK: "旺角東",
  KOT: "九龍塘",
  TAW: "大圍",
  SHT: "沙田",
  FOT: "火炭",
  RAC: "馬場",
  UNI: "大學",
  TAP: "大埔墟",
  TWO: "太和",
  FAN: "粉嶺",
  SHS: "上水",
  LOW: "羅湖",
  LMC: "落馬洲",
};
