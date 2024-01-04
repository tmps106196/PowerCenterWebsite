clock = 8
const date = new Date();
var url = "https://script.google.com/macros/s/AKfycby7t5ae3I3Df8LRQAXyAjHCIRl_EXL33byC9vG2B6wqXCpFqC5hwd_zf_EfYMaZCktI/exec"
document.getElementById('year').style.display = "none"
document.getElementById('month').style.display = "none"
document.getElementById('day').style.display = "none"
document.getElementById('hour').style.display = "none"

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (getCookie("usrid") == "") {
  open("../log in", "_self")
}

document.getElementById("logout").addEventListener("click", function() {
  document.cookie = "usrid=;path=/;";
  open("../log in", "_self")
});




$.ajax({
  url: url,
  data: {
    mode: "getpeerdata",
    id: "a" + getCookie("usrid")
  },
  success: function(res) {
    console.log(JSON.parse(res));

    for (let i = 0; i < JSON.parse(res)[1].length; i++) {
      console.log(JSON.parse(res)[0])
      document.getElementById("selecter-id").innerHTML += "<option value=" + JSON.parse(res)[0][i] + ">" + JSON.parse(res)[1][i].slice(1) + "</option>"
    }

  }
})

document.getElementById("new").addEventListener("click", function() {
  Swal.fire({
    title: '配對',
    input: "text",
    text: "請輸入裝置ID",
    showCancelButton: true,
    confirmButtonText: 'OK',
    preConfirm: async (input1) => {
      console.log(input1)
      Swal.fire({
        title: '配對',
        input: "text",
        text: "請輸入裝置名稱",
        showCancelButton: true,
        confirmButtonText: 'OK',
        preConfirm: async (input2) => {
          console.log(input2)
          Swal.fire({
            title: "載入中...",
            html: "正在配對",
            didOpen: () => {
              Swal.showLoading();
            }
          });

          $.ajax({
            url: url,
            data: {
              mode: "newpeer",
              peerid: "a" + input1,
              name: "a" + input2,
              id: "a" + getCookie("usrid"),

            },
            success: function(res) {
              document.getElementById("selecter-id").innerHTML += "<option value=" + "a" + input1 + ">" + input2 + "</option>"
              Swal.fire({
                title: '配對成功',
              })
            }
          })
        }
      })
    }
  })
})

document.getElementById("selecter-pic").addEventListener("change", function() {
  var val = document.getElementById("selecter-pic").value
  console.log(document.getElementById("selecter-pic").value)
  if (val == "year") {
    document.getElementById("year").innerHTML = ""
    for (let i = 2023; i < 2051; i++) {
      document.getElementById("year").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    document.getElementById('year').style.display = "flex"
    document.getElementById('month').style.display = "none"
    document.getElementById('day').style.display = "none"
    document.getElementById('hour').style.display = "none"

    document.getElementById('year').value = String(date.getFullYear());
  } else if (val == "month") {
    document.getElementById("year").innerHTML = ""
    document.getElementById("month").innerHTML = ""
    for (let i = 2023; i < 2051; i++) {
      document.getElementById("year").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    for (let i = 1; i < 13; i++) {
      document.getElementById("month").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    document.getElementById('year').style.display = "flex"
    document.getElementById('month').style.display = "flex"
    document.getElementById('day').style.display = "none"
    document.getElementById('hour').style.display = "none"

    document.getElementById('year').value = String(date.getFullYear());
    document.getElementById('month').value = String(date.getMonth());
  } else if (val == "day") {
    document.getElementById("year").innerHTML = ""
    document.getElementById("month").innerHTML = ""
    document.getElementById("day").innerHTML = ""
    for (let i = 2023; i < 2051; i++) {
      document.getElementById("year").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    for (let i = 1; i < 13; i++) {
      document.getElementById("month").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    for (let i = 1; i < 32; i++) {
      document.getElementById("day").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    document.getElementById('year').style.display = "flex"
    document.getElementById('month').style.display = "flex"
    document.getElementById('day').style.display = "flex"
    document.getElementById('hour').style.display = "none"

    document.getElementById('year').value = String(date.getFullYear());
    document.getElementById('month').value = String(date.getMonth());
    document.getElementById('day').value = String(date.getDate());
  } else if (val == "hour") {
    document.getElementById("year").innerHTML = ""
    document.getElementById("month").innerHTML = ""
    document.getElementById("day").innerHTML = ""
    for (let i = 2023; i < 2051; i++) {
      document.getElementById("year").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    for (let i = 1; i < 13; i++) {
      document.getElementById("month").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    for (let i = 1; i < 32; i++) {
      document.getElementById("day").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    for (let i = 1; i < 25; i++) {
      document.getElementById("hour").innerHTML += '<option value="' + String(i) + '">' + String(i) + '</option>'
    }
    document.getElementById('year').style.display = "flex"
    document.getElementById('month').style.display = "flex"
    document.getElementById('day').style.display = "flex"
    document.getElementById('hour').style.display = "flex"

    document.getElementById('year').value = String(date.getFullYear());
    document.getElementById('month').value = String(date.getMonth());
    document.getElementById('day').value = String(date.getDate());
    document.getElementById('hour').value = String(date.getHours());
  }
})

document.getElementById("month").addEventListener("change", function() {
  const year = parseInt(document.getElementById("year").value);
  const month = parseInt(document.getElementById("month").value);
  const dayElement = document.getElementById("day");

  // 清空日期選項
  dayElement.value = "";
  dayElement.innerHTML = "";

  let daysInMonth;

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    // 閏年的2月
    daysInMonth = (month === 2) ? 29 : 31;
  } else {
    // 非閏年的2月
    daysInMonth = (month === 2) ? 28 : 31;
  }

  // 根據月份設置日期選項
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
  }

  // 填充日期選項
  for (let i = 1; i <= daysInMonth; i++) {
    dayElement.innerHTML += '<option value="' + i + '">' + i + '</option>';
  }
});
var data = {}
document.getElementById("check").addEventListener("click", function() {
  Swal.fire({
    title: "載入中...",
    html: "正在查詢資料中",
    didOpen: () => {
      Swal.showLoading();
    }
  });
  const year = parseInt(document.getElementById("year").value);
  const month = parseInt(document.getElementById("month").value);
  const day = parseInt(document.getElementById("day").value);
  const hour = parseInt(document.getElementById("hour").value);

  data = {}
  $.ajax({
    url: url,
    data: {
      mode: "getpowerdata",
      id: document.getElementById("selecter-id").value
    },
    success: function(res) {
      resdata = JSON.parse(res)
      console.log(JSON.parse(res));
      for (let i = 0; i < JSON.parse(res).length; i++) {
        console.log(resdata[0][i])
        data[resdata[i][0].slice(1).split("/")[0]] = {}
      }
      for (let i = 0; i < JSON.parse(res).length; i++) {
        data[resdata[i][0].slice(1).split("/")[0]][JSON.parse(res)[i][0].slice(1).split("/")[1]] = {}
      }
      for (let i = 0; i < JSON.parse(res).length; i++) {
        data[resdata[i][0].slice(1).split("/")[0]][JSON.parse(res)[i][0].slice(1).split("/")[1]][JSON.parse(res)[i][0].slice(1).split("/")[2]] = {}
      }
      for (let i = 0; i < JSON.parse(res).length; i++) {
        data[resdata[i][0].slice(1).split("/")[0]][JSON.parse(res)[i][0].slice(1).split("/")[1]][JSON.parse(res)[i][0].slice(1).split("/")[2]][JSON.parse(res)[i][0].slice(1).split("/")[3]] = {}

      }
      for (let i = 0; i < JSON.parse(res).length; i++) {
        data[resdata[i][0].slice(1).split("/")[0]][JSON.parse(res)[i][0].slice(1).split("/")[1]][JSON.parse(res)[i][0].slice(1).split("/")[2]][JSON.parse(res)[i][0].slice(1).split("/")[3]][JSON.parse(res)[i][0].slice(1).split("/")[4]] = parseInt(JSON.parse(res)[i][1].slice(1))

      }

      pic = document.getElementById("selecter-pic").value

      if (pic == "hour") {
        var show = sum(get_hour(year, month, day, hour, data))
      } else if (pic == "day") {
        var show = sum(get_day(year, month, day, data))
      } else if (pic == "month") {
        var show = sum(get_month(year, month, data))
      } else if (pic == "year") {
        var show = sum(get_year(year, data))
      }
      Swal.fire({
        html: `
          <div id="container" style="heigh:200px;width:400px">test</div>
        `,
        focusConfirm: false,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
          <i class="fa fa-thumbs-down"></i>
        `,
        cancelButtonAriaLabel: "Thumbs down"
      });
      Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: '用電量報表'
        },
        subtitle: {
          text: "powercenter"
        },
        xAxis: {
          categories: [1],
          type: 'category'
        },
        yAxis: {
          title: {
            text: '用電量'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}度'
            }
          }
        },
        series: [{
          name: '耗費電度',
          data: show
        }],
      });

    }
  })
})

var datas = []

function get_year(year, dataval) {
  datas = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "11": [], "12": [] }
  for (month in dataval[year]) {
    for (day in dataval[year][month]) {
      for (hour in dataval[year][month][day]) {
        for (min in dataval[year][month][day][hour]) {
          console.log(dataval[year][month][day][hour][min])
          datas[month].push(dataval[year][month][day][hour][min])

        }
      }
    }
  }
  return (datas)
}

function get_month(year, month, dataval) {
  datas = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "11": [], "12": [], "13": [], "14": [], "15": [], "16": [], "17": [], "18": [], "19": [], "20": [], "21": [], "22": [], "23": [], "24": [], "25": [], "26": [], "27": [], "28": [], "29": [], "30": [], "31": [] }
  for (day in dataval[year][month]) {
    for (hour in dataval[year][month][day]) {
      for (min in dataval[year][month][day][hour]) {
        console.log(dataval[year][month][day][hour][min])
        datas[day].push(dataval[year][month][day][hour][min])

      }
    }
  }
  return (datas)
}

function get_day(year, month, day, dataval) {
  datas = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10": [], "11": [], "12": [], "13": [], "14": [], "15": [], "16": [], "17": [], "18": [], "19": [], "20": [], "21": [], "22": [], "23": [], "24": [] }
  for (hour in dataval[year][month][day]) {
    for (min in dataval[year][month][day][hour]) {
      console.log(dataval[year][month][day][hour][min])
      datas[hour].push(dataval[year][month][day][hour][min])
    }
  }
  return (datas)
}

function get_hour(year, month, day, hour, dataval) {
  datas = { "0": [], "6": [], "12": [], "18": [], "24": [], "30": [], "36": [], "42": [], "48": [], "54": [] }
  for (min in dataval[year][month][day][hour]) {
    console.log(dataval[year][month][day][hour][min])
    datas[min].push(dataval[year][month][day][hour][min])
  }
  return (datas)
}

function sum(li) {
  console.log(li)
  var return_val = []
  for (i in li) {
    console.log(li[i])
    try {
      return_val.push(li[i].reduce((a, b) => a + b))
    } catch (e) {
      return_val.push(0)
    }
  }
  return return_val;
}