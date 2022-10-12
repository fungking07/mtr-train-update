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

      var downdata = result["data"][`${line}-${station}`]["DOWN"] ?? null;
      var updata = result["data"][`${line}-${station}`]["UP"] ?? null;
      if (updata !== null) {
        for (var i = 0; i < updata.length; i++) {
          document.getElementById(`up-train${i + 1}-time`).innerHTML = updata[i]["time"];
          document.getElementById(`up-train${i + 1}-dest`).innerHTML = eval(line)[updata[i]["dest"]];
          document.getElementById(`up-train${i + 1}-plat`).innerHTML = updata[i]["plat"];
          document.getElementById(`up-train${i + 1}-ttnt`).innerHTML = updata[i]["ttnt"];
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
          document.getElementById(`down-train${i + 1}-time`).innerHTML = downdata[i]["time"];
          document.getElementById(`down-train${i + 1}-dest`).innerHTML = eval(line)[downdata[i]["dest"]];
          document.getElementById(`down-train${i + 1}-plat`).innerHTML = downdata[i]["plat"];
          document.getElementById(`down-train${i + 1}-ttnt`).innerHTML = downdata[i]["ttnt"];
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
  (myInterval !== null) ? clearInterval(myInterval) : myInterval = null;
  var line = document.getElementById("line").value;
  var station = document.getElementById("station").value;
  document.getElementById("sta_name").innerHTML =
    eval(line)[station].toUpperCase();
    myInterval = setInterval(mtrUpdate, 1000, line, station);
};

const AEL = {
  HOK: "Hong Kong",
  KOW: "Kowloon",
  TSY: "Tsing Yi",
  AIR: "Airport",
  AWE: "AsiaWorld Expo",
};

const TCL = {
  HOK: "Hong Kong",
  KOW: "Kowloon",
  OLY: "Olympic",
  NAC: "Nam Cheong",
  LAK: "Lai King",
  TSY: "Tsing Yi",
  SUN: "Sunny Bay",
  TUC: "Tung Chung",
};

const TML = {
  WKS: "Wu Kai Sha",
  MOS: "Ma On Shan",
  HEO: "Heng On",
  TSH: "Tai Shui Hang",
  SHM: "Shek Mun",
  CIO: "City One",
  STW: "Sha Tin Wai",
  CKT: "Che Kung Temple",
  TAW: "Tai Wai",
  HIK: "Hin Keng",
  DIH: "Diamond Hill",
  KAT: "Kai Tak",
  SUW: "Sung Wong Toi",
  TKW: "To Kwa Wan",
  HOM: "Ho Man Tin",
  HUH: "Hung Hom",
  ETS: "East Tsim Sha Tsui",
  AUS: "Austin",
  NAC: "Nam Cheong",
  MEF: "Mei Foo",
  TWW: "Tsuen Wan West",
  KSR: "Kam Sheung Road",
  YUL: "Yuen Long",
  LOP: "Long Ping",
  TIS: "Tin Shui Wai",
  SIH: "Siu Hong",
  TUM: "Tuen Mun",
};

const TKL = {
  NOP: "North Point",
  QUB: "Quarry Bay",
  YAT: "Yau Tong",
  TIK: "Tiu Keng Leng",
  TKO: "Tseung Kwan O",
  LHP: "LOHAS Park",
  HAH: "Hang Hau",
  POA: "Po Lam",
};

const EAL = {
  ADM: "Admiralty",
  EXC: "Exhibition Centre",
  HUH: "Hung Hom",
  MKK: "Mong Kok East",
  KOT: "Kowloon Tong",
  TAW: "Tai Wai",
  SHT: "Sha Tin",
  FOT: "Fo Tan",
  RAC: "Racecourse",
  UNI: "University",
  TAP: "Tai Po Market",
  TWO: "Tai Wo",
  FAN: "Fanling",
  SHS: "Sheung Shui",
  LOW: "Lo Wu",
  LMC: "Lok Ma Chau",
};
