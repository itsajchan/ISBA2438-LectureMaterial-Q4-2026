var EXPIRE_DAYS = 30;

function setCookie(name, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + EXPIRE_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();
}

function getCookie(name) {
  var cname = name + "=";
  var dc = document.cookie;
  if (dc.length > 0) {
    var begin = dc.indexOf(cname);
    if (begin != -1) {
      begin += cname.length;
      var end = dc.indexOf(";", begin);
      if (end == -1) end = dc.length;
      return unescape(dc.substring(begin, end));
    }
  }
  return null;
}

function greetUser() {
  var name = getCookie("visitor");
  if (!name) {
    name = prompt("Hi there surfer! What's your name?", "");
    if (name) setCookie("visitor", name);
  }
  if (name) {
    document.write("<B>Welcome back, " + name + "!</B>");
  } else {
    document.write("<B>Welcome, mysterious stranger!</B>");
  }
}

function showClock() {
  var now = new Date();
  document.write(now.toLocaleString());
}

function showCount() {
  var count = getCookie("hits");
  count = count ? parseInt(count) + 1 : 1;
  setCookie("hits", count);
  document.write(count);
}

function daysUntil2000() {
  var y2k = new Date(2000, 0, 1);
  var now = new Date();
  var days = Math.ceil((y2k.getTime() - now.getTime()) / 86400000);
  if (days > 0) {
    document.write(days + " DAYS until the year 2000!!!");
  } else {
    document.write("Welcome to the 21st Century!");
  }
}

function statusScroll() {
  var msg = "=== WELCOME TO AJ'S HOME PAGE === SIGN THE GUESTBOOK!!! === NOW WITH JAVASCRIPT === ";
  var pos = 0;
  function scroll() {
    window.status = msg.substring(pos, msg.length) + msg.substring(0, pos);
    pos = (pos + 1) % msg.length;
  }
  setInterval(scroll, 200);
}

function modemSound() {
  alert("kshhhhhhhhh... beeeeeeeeeeeeee... doo-doo-doo... kshhhhhhhhhh\n\nCONNECT 28800/ARQ/V34/LAPM/V42BIS");
}

function validateGuestbook(form) {
  if (form.username.value == "") {
    alert("Please enter your name!");
    return false;
  }
  if (form.comments.value == "") {
    alert("Please leave a comment!");
    return false;
  }
  alert("Thanks for signing my guestbook, " + form.username.value + "!!!");
  return true;
}
