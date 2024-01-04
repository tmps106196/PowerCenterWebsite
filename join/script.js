var url = "https://script.google.com/macros/s/AKfycby7t5ae3I3Df8LRQAXyAjHCIRl_EXL33byC9vG2B6wqXCpFqC5hwd_zf_EfYMaZCktI/exec"
var canclick = 0
function go() {
  open("../log in", "_self")
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


document.getElementById("check").addEventListener("click", function() {
  Swal.fire({
    title: "載入中...",
    html: "正在註冊",
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
    if (document.getElementById("password").value == document.getElementById("dublepassword").value) {
      $.ajax({
        url: url,
        data: {
          mode: "register",
          username: "a" + document.getElementById("username").value,
          password: "a" + document.getElementById("password").value,
          id: "a" + document.getElementById("id").value,
          name: "a" + document.getElementById("name").value
        },
        success: function(res) {
          console.log(JSON.parse(res)[0]);
          if (JSON.parse(res)[0] == false) {
            if (JSON.parse(res)[1] == 1) {
              Swal.fire({
                title: '錯誤',
                text: "該裝置已被註冊",
                icon: "error",
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  // 执行帐号名已被注册后的操作
                }
              });
            } else {
              Swal.fire({
                title: '錯誤',
                text: "用戶名稱已被註冊",
                icon: "error",
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  // 执行ID已被注册后的操作
                }
              });
            }
          } else if (JSON.parse(res)[0] == true) {
            document.cookie = 'usrid=' + JSON.parse(res)[1] + ";path=/"
            Swal.fire({
              title: '註冊成功',
              confirmButtonText: '前往面板',
            }).then((result) => {
              if (result.isConfirmed) {
                open("../panel", "_self")
                // 执行注册成功后的操作
              }
              open("../panel", "_self")
            });
          }
          canclick = 0;
          document.getElementById("check").style.cursor = "pointer";
        },
        error: function(err) {
          Swal.fire({
            title: '錯誤',
            text: err,
            icon: "error",
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // 执行错误处理后的操作
            }
          });
          canclick = 0;
          document.getElementById("check").style.cursor = "pointer";
        }
      });
    }
  }
});
