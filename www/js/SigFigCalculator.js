function numOfSigFigs() {
  var num = document.getElementById("num-in").value;
  var res = sigFig(num);
  document.getElementById("sig-fig-out").innerHTML = "The number of sig figs is: " + res;
}

function multiplyTerms() {
  var num1 = document.getElementById("multi1").value;
  var num2 = document.getElementById("multi2").value;
  var sigFigs = Math.min(sigFig(num1), sigFig(num2));
  var res = (parseFloat(num1) * parseFloat(num2)).toString();
  if (containsDecimal(res)) {
    var roundTo = Math.pow(10, (lengthWithoutDecimal(res) - sigFigs - digitsAfterDecimal(res)));
  } else {
    var roundTo = Math.pow(10, (lengthWithoutDecimal(res) - sigFigs));
  }
  res = parseFloat(res);
  res = Math.round(res / roundTo) * roundTo;
  document.getElementById("multi-out").innerHTML = "= " + res;
}

function divideTerms() {
  var num1 = document.getElementById("divide1").value;
  var num2 = document.getElementById("divide2").value;
  var sigFigs = Math.min(sigFig(num1), sigFig(num2));
  var res = (parseFloat(num1) / parseFloat(num2)).toString();
  var roundTo = Math.pow(10, (res.length - sigFigs));
  res = parseFloat(res);
  res = Math.round(res / roundTo) * roundTo;
  document.getElementById("divide-out").innerHTML = "= " + res;
}

function addTerms() {

}

function subtractTerms() {

}

function sigFig(n) {
  var num = n;
  num = removeFrontZeros(num);
  var res = 0;
  if (!containsDecimal(num)) {
    res = getAtlantic(num);
  } else if (containsDecimal(num)) {
    res = getPacific(num);
  }
  return res;
}

function containsDecimal(n) {
  str = n.toString();
  var res = false;
  for (i = 0; i < str.length; i++) {
    if (str.charAt(i) == '.') res = true;
  }
  return res;
}

function removeFrontZeros(n) {
  var i = 0;
  while (n.charAt(i) == '0') {
    i++;
  }
  return n.substring(i);
}

function lengthWithoutDecimal(n) {
  var res = 0;
  str = n.toString();
  str = str.replace(".", "");
  res = str.length;
  return res;
}

function digitsAfterDecimal(n) {
  var res = 0;
  var index = 0;
  str = n.toString();
  for (i = 0; str.charAt(i) != '.'; i++) {
    index++;
  }
  return (str.substring(index+1)).length;
}

function getAtlantic(n) {
  var res = 0;
  var passedNonZero = false;
  for (i = n.length - 1; i > -1; i--) {
    if (passedNonZero && !isNaN(n.charAt(i)) && n.charAt(i) != ' ') res++;
    if (!passedNonZero && n.charAt(i) > 0) {
      passedNonZero = true;
      res++;
    }
  }
  return res;
}

function getPacific(n) {
  var res = 0;
  var passedNonZero = false;
  for (i = 0; i < n.length; i++) {
    if (passedNonZero && !isNaN(n.charAt(i)) && n.charAt(i) != ' ') res++;
    if (!passedNonZero && n.charAt(i) > 0) {
      passedNonZero = true;
      res++;
    }
  }
  return res;
}