function A() {
  this.a = 3;
  b = 4;
}
A.prototype.c = 5;
window.a = new A();

function generatePrivate(a, getFunc, setFunc) {
  if (getFunc == null) {
    getFunc = function (variable) {
      return variable;
    };
  }
  if (setFunc == null) {
    setFunc = function (variable) {
      return variable;
    };
  }
  return {
    get: function () {
      return getFunc(a);
    },
    set: function (b) {
      a = setFunc(b);
    },
  };
}

window.custom = {
  Promise() {},
};

// async await实现
// window.custom.Promise.all = async function all(arrs) {
//   const result = [];
//   for (let i = 0; i < arrs.length; i++) {
//     const res = await arrs[i];
//     result.push(res);
//   }
//   return result;
// };


// generate实现
window.custom.Promise.all = function* all(arrs) {
  const result = [];
  for (let i = 0; i < arrs.length; i++) {
    const res = yield arrs[i];
    result.push(res);
  }
  return result;
};

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
    resolve(89);
  }, 10000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(45)
  }, 5000);
});

promise2.catch(() => {console.log('异常1'); throw Error();}).catch(() => {console.log('异常2')});

var generateFunc = window.custom.Promise.all([promise1, promise2]);

// function* loginFunc() {
//   while(true) {
//     yield console.log('登录');
//     yield console.log('登出');
//   }
// }

var dp = [];

var a = [4, 6, 5, 7, 3]

for (let i = 0; i < a.length; i++) {
  dp[i] = 0;
  for (let j = 1; j < i; j++) {
    if (a[j] <= a[i] && dp[j] > dp[i]) {
      dp[i] = dp[j];
    }
  }
  dp[i] = dp[i] + 1;
}

console.log(dp);
