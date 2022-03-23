/**
 * 简单排序
 * @returns
 */
export function simpleSort(): Array<number> {
  var a = [7, 5, 9, 4, 8, 2, 0, 12, 10, 6];
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[j + 1] < a[i]) {
        let temp = a[i];
        a[i] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
  return a;
}

/**
 * 冒泡排序
 * @returns
 */
export function bubbleSort(): Array<number> {
  var a = [7, 5, 9, 4, 8, 2, 0, 12, 10, 6];
  for (let i = 0; i < a.length; i++) {
    let isSwap = false;
    for (let j = 0; j < a.length; j++) {
      if (a[j + 1] < a[j]) {
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
        isSwap = true;
      }
    }
    if (!isSwap) {
      break;
    }
  }
  return a;
}

/**
 * 快速排序
 * @param a
 * @param left
 * @param right
 */
function quckSortDeep(a, left, right) {
  if (left < right) {
    let temp = a[left];
    let i = left,
      j = right;
    while (i < j) {
      // 从右边找到第一个小于基准的数
      while (i < j && a[j] > temp) {
        j--;
      }
      if (i < j) {
        a[i++] = a[j];
      }
      // 从左边找到第一个大于基准的数
      while (i < j && a[i] < temp) {
        i++;
      }
      if (i < j) {
        a[j--] = a[i];
      }
    }
    a[i] = temp;
    quckSortDeep(a, left, i - 1);
    quckSortDeep(a, i + 1, right);
  }
}

/**
 * 快速排序
 * @returns
 */
export function quickSort(): Array<number> {
  var a = [7, 5, 9, 4, 8, 2, 0, 12, 10, 6];
  quckSortDeep(a, 0, a.length - 1);
  return a;
}

/**
 * 插入排序
 */
export function insertSort(): Array<number> {
  var a = [7, 5, 9, 4, 8, 2, 0, 12, 10, 6];
  // i从1开始,1前面的索引都是排序好的
  for (let i = 1; i < a.length; i++) {
    let j = i - 1;
    let next = a[i];
    while (j >= 0) {
      if (next < a[j]) {
        let temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
        j--;
      } else {
        break;
      }
    }
  }
  return a;
}
