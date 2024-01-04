var url = "https://script.google.com/macros/s/AKfycby7t5ae3I3Df8LRQAXyAjHCIRl_EXL33byC9vG2B6wqXCpFqC5hwd_zf_EfYMaZCktI/exec"

function go() {
  open("../join", "_self")
}

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

if (getCookie("usrid") != "") {
  open("../panel", "_self")
}


var canclick = 0
document.getElementById("check").addEventListener("click", function() {
  Swal.fire({
    title: "載入中...",
    html: "正在登入",
    didOpen: () => {
      Swal.showLoading();
    }
  });
  console.log(canclick);
  if (canclick == 0) {
    canclick = 1;
    console.log("click");
    document.getElementById("check").style.cursor = "not-allowed";
    console.log(canclick);

    $.ajax({
      url: url,
      data: {
        mode: "Login",
        username: "a" + document.getElementById("username").value,
        password: "a" + document.getElementById("password").value
      },
      success: function(res) {
        console.log(JSON.parse(res)[0]);
        if (JSON.parse(res)[0] == false) {
          Swal.fire({
            title: '錯誤',
            text: "帳號或密碼錯誤",
            icon: "error",
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // 执行帐号名已被注册后的操作
            }
          })
          canclick = 0
          document.getElementById("check").style.cursor = "pointer";
        }
        else if (JSON.parse(res)[0] == true) {
          document.cookie = 'usrid=' + JSON.parse(res)[1] + ";path=/"
          Swal.fire({
            title: '登入成功',
            confirmButtonText: '前往面板',
          }).then((result) => {
            if (result.isConfirmed) {
              open("../panel", "_self")
              // 执行注册成功后的操作
            }
            open("../panel", "_self")
          });
        }
      }
    })
  }
})