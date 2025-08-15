var username = document.getElementById("username");
var email = document.getElementById("email-sign");
var pass = document.getElementById("pass-sign");
var formMsg = document.getElementById("formMsg");
var regexname = /^[a-z0-9_]{3,15}$/;
var regexemail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.com/;
var regexpass = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
var users = [];
var msgE = document.getElementById("msgEmail");
var exist = false;
var signedup = false;
var loginMsg = document.getElementById("loginMsg");
// login inputs
var loginemail = document.getElementById("email-input");
var loginpass = document.getElementById("pass-input");
var index;
// home
var title = document.getElementById("title");

if (JSON.parse(localStorage.getItem("user")) != null) {
  users = JSON.parse(localStorage.getItem("user"));
}

function sign_up() {
  var textuser = username.value;
  var textemail = email.value;
  var textpass = pass.value;
  if (textuser == "" || textemail == "" || textpass == "") {
    formMsg.classList.remove("d-none");
    formMsg.textContent = "Please fill in all the fields first.";
    formMsg.style.color = "red";
  }

  if (
    regexname.test(textuser) &&
    regexemail.test(textemail) &&
    regexpass.test(textpass)
  ) {
    var exist = false;
    for (var i = 0; i < users.length; i++) {
      if (textemail == users[i].email) {
        exist = true;
        break;
      }
    }

    if (exist) {
      msgE.classList.remove("d-none");
      msgE.textContent = "This email already exists. Please enter another one";
      msgE.style.color = "red";
    } else {
      var data = {
        name: username.value,
        email: email.value,
        password: pass.value,
      };
      users.push(data);
      localStorage.setItem("user", JSON.stringify(users));
      clear();
      formMsg.classList.remove("d-none");
      formMsg.textContent = "Sign up successful";
      formMsg.style.color = "green";
      setTimeout(function () {
        window.location.href = "../index.html";
      }, 500);
    }
  }
}
function validate_name() {
  formMsg.classList.add("d-none");
  var text = username.value;
  var msgName = document.getElementById("msgName");

  if (!msgName) {
    msgName = document.createElement("p");
    msgName.id = "msgName";
    msgName.classList.add("m-2");
    username.parentNode.appendChild(msgName);
  }

  if (regexname.test(text)) {
    username.classList.remove("is-invalid");
    username.classList.add("is-valid");
    msgName.classList.add("d-none");
  } else {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
    msgName.textContent = "Name must be 3–15 characters and can only include lowercase letters, numbers, and underscores.";
    msgName.style.color = "red";
    msgName.classList.remove("d-none");
  }
}

function validate_email() {
  formMsg.classList.add("d-none");
  var text = email.value;

  if (regexemail.test(text)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    msgE.classList.add("d-none");
  } else {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    msgE.textContent = "Please enter a valid email like: example@domain.com";
    msgE.style.color = "red";
    msgE.classList.remove("d-none");
  }
}

function validate_pass() {
  formMsg.classList.add("d-none");
  var text = pass.value;
  var msg = document.getElementById("msg");

  if (regexpass.test(text)) {
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
    msg.classList.add("d-none");
  } else {
    pass.classList.add("is-invalid");
    pass.classList.remove("is-valid");
    msg.textContent = "Password must be at least 8 characters, include 1 letter and 1 number.";
    msg.style.color = "red";
    msg.classList.remove("d-none");
  }
}

function clear() {
  username.value = "";
  email.value = "";
  pass.value = "";
  username.classList.remove("is-valid", "is-invalid");
  email.classList.remove("is-valid", "is-invalid");
  pass.classList.remove("is-valid", "is-invalid");
}

function login() {
  var textemail = loginemail.value;
  var textpass = loginpass.value;
  if (textemail == "" || textpass == "") {
    loginMsg.textContent = "Please fill in all the fields first.";
    loginMsg.style.color = "red";
    loginemail.addEventListener("input", function () {
      loginMsg.textContent = "";
    });
    loginpass.addEventListener("input", function () {
      loginMsg.textContent = "";
    });
  } else {
    var signedup = false;
    for (var i = 0; i < users.length; i++) {
      if (textemail == users[i].email && textpass == users[i].password) {
        signedup = true;
        index = i;
        break;
      }
    }

    if (signedup) {
      loginMsg.textContent = "Login successful";
      loginMsg.style.color = "green";
      localStorage.setItem("currentUser", index);
      setTimeout(function () {
        window.location.href = "./html/home.html";
      }, 500);

      loginemail.value = "";
      loginpass.value = "";
    } else {
      loginMsg.textContent = "Wrong Password Or Email";
      loginMsg.style.color = "red";
      loginemail.addEventListener("input", function () {
        loginMsg.textContent = "";
      });
      loginpass.addEventListener("input", function () {
        loginMsg.textContent = "";
      });
    }
  }
}


