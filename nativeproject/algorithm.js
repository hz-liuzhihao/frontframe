document.getElementById("ok1").onclick = function () {
  let inputEle = document.getElementById("reply_str");
  let value = inputEle.value;
  const checkLetters = [];
  const letters = value;
  let maxLength = 0;
  for (let i = 0; i < letters.length; i++) {
    const index = checkLetters.indexOf(letters[i]);
    if (index > -1) {
      if (checkLetters.length > maxLength) {
        maxLength = checkLetters.length;
      }
      checkLetters.splice(0, index + 1);
      checkLetters.push(letters[i]);
    } else {
      checkLetters.push(letters[i]);
      if (checkLetters.length > maxLength) {
        maxLength = checkLetters.length;
      }
    }
  }

  document.getElementById("result1").textContent = maxLength;
};

// 超时
// document.getElementById("ok2").onclick = function () {
//   let inputEle = document.getElementById("value2");
//   let value = inputEle.value.split('').join(' ');
//   let maxText = "";
//   for (let i = 0; i < value.length; i++) {
//     let leftIndex = i - 1;
//     let rightIndex = i + 1;
//     let text = value[i];
//     if (text.length > maxText.length) {
//       maxText = text;
//     }
//     while (leftIndex > -1 && rightIndex < value.length) {
//       if (value[leftIndex] == value[rightIndex]) {
//         text = value.slice(leftIndex, rightIndex + 1).replace(/ /ig, '');
//         if (text.length > maxText.length) {
//           maxText = text;
//         }
//         leftIndex--;
//         rightIndex++;
//       } else {
//         break;
//       }
//     }
//   }

//   document.getElementById("result2").textContent = maxText;
// };

document.getElementById("ok2").onclick = function () {
  let inputEle = document.getElementById("value2");
  let value = inputEle.value;
  if (value.length == 1) {
    return value;
  }
  const position = new Array(value.length);
  for (let i = 0; i < position.length; i++) {
    position[i] = new Array(value.length);
  }
  let maxLen = 1;
  let begin = 0;
  for (let i = 0; i < value.length; i++) {
    position[i][i] = true;
  }
  for (let L = 2; L <= value.length; L++) {
    for (let i = 0; i <= value.length - L; i++) {
      let j = L + i - 1;
      if (value[i] != value[j]) {
        position[i][j] = false;
      } else {
        if (j - i < 3) {
          position[i][j] = true;
        } else {
          position[i][j] = position[i + 1][j - 1];
        }
      }
      if (position[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        begin = i;
      }
    }
  }

  document.getElementById("result2").textContent = value.substr(begin, maxLen);
};

document.getElementById("ok3").onclick = function () {
  let inputEle = document.getElementById("value3");
  let value = inputEle.value;
  let numRowsEle = document.getElementById("numRows");
  let numRows = parseInt(numRowsEle.value);
  const rect = new Array(numRows);
  for (let i = 0; i < rect.length; i++) {
    rect[i] = [];
  }
  const count = numRows * 2 - 2;
  const periods = Math.ceil(value.length / count);
  for (let period = 0; period < periods; period++) {
    for (let i = 0; i < count; i++) {
      if (i >= numRows) {
        rect[numRows * 2 - count][period * numRows + count - numRows] =
          value[period * count + i];
      } else {
        rect[i][period * (numRows - 1)] = value[period * count + i];
      }
    }
  }
  let s = "<br/>";
  for (let row = 0; row < rect.length; row++) {
    for (let col = 0; col < rect[row].length; col++) {
      if (rect[row][col]) {
        s += rect[row][col];
      } else {
        s += " ";
      }
    }
    s += "<br/>";
  }
  document.getElementById("result3").innerHTML = s;
};
