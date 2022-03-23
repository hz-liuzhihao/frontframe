import { bubbleSort, quickSort, simpleSort, insertSort } from "./Sort/index";
(function() {
  const root = document.getElementById("root");
  const result = bubbleSort();
  const resultQuick = quickSort();
  const resultSimple = simpleSort();
  const resultInsert = insertSort();
  const resultElement = document.createElement("div");
  const results = result.map(
    (item) =>
      (document.createElement("span").textContent = item.toString() + "，")
  );
  resultElement.append(...results);
  root.appendChild(resultElement);
  const resultQuickElement = document.createElement("div");
  const resultQuicks = resultQuick.map(
    (item) =>
      (document.createElement("span").textContent = item.toString() + "，")
  );
  resultQuickElement.append(...resultQuicks);
  root.appendChild(resultQuickElement);
  const resultSimpleElement = document.createElement("div");
  const resultSimples = resultSimple.map(
    (item) =>
      (document.createElement("span").textContent = item.toString() + "，")
  );
  resultSimpleElement.append(...resultSimples);
  root.appendChild(resultSimpleElement);

  const resultInsertElement = document.createElement("div");
  const resultInserts = resultInsert.map(
    (item) =>
      (document.createElement("span").textContent = item.toString() + "，")
  );
  resultInsertElement.append(...resultInserts);
  root.appendChild(resultInsertElement);
})();
