let a = "";
let b = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/"];

const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".ac").onclick = clearAll;

document.querySelector(".buttons").onclick = (e) => {
  if (!e.target.classList.contains("btn")) return;
  if (e.target.classList.contains("ac")) return;

  out.textContent = "";

  const key = e.target.textContent;

  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
      console.log(a, b, sign);
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = a + sign + b;
    } else {
      b += key;
      out.textContent = a + sign + b;
    }
  }

  if (action.includes(key)) {
    sign = key;
    out.textContent = a + sign;
    console.log(a, b, sign);
  }

  function equals() {
    switch (sign) {
      case "+":
        a = +(+a + +b).toFixed(7);
        break;
      case "-":
        a = +(a - b).toFixed(7);
        break;
      case "x":
        a = +(a * b).toFixed(7);
        break;
      case "/":
        a = +(a / b).toFixed(7);
        break;
    }
    finish = true;
    out.textContent = a;
  }
  if (key === "=") {
    equals();
    finish = true;
    out.textContent = a;
  }
  if (key === "%") {
    equals();
    b = "";
    sign = "";
    a = a / 100;
    finish = true;
    out.textContent = a;
  }
  if (key === "+/-") {
    equals();
    b = "";
    sign = "";
    if (a === "0" || a === "") {
      a = 0;
    } else {
      a = a - a * 2;
    }

    finish = true;
    out.textContent = a;
  }

  if (key === "del") {
    if (b !== "") {
      b = b.substring(0, b.length - 1);
      finish = true;
      out.textContent = a + sign + b;
      console.log(b.length);
    } else if (sign !== "") {
      sign = "";
      finish = true;
      out.textContent = a;
    } else if (a.length > 0) {
      a = a.substring(0, a.length - 1);
      finish = true;
      out.textContent = a;
    } else {
      finish = false;
      out.textContent = 0;
    }
  }
};
