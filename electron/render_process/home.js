const { ipcRenderer } = require("electron");
const fs = require("fs");

let buttonElement = document.getElementById("showDialog");

buttonElement.addEventListener("click", () => {
  ipcRenderer.send("showDialog", {
    message: "你好啊",
  });
});

let currentPath = __dirname;

let showFiles = (files) => {
  let body = document.body;
  body.innerHTML = "";
  files.forEach((file) => {
    let p = document.createElement("p");
    p.addEventListener("click", (event) => {
      let element = event.srcElement;
      let nextName = element.textContent;
      let nextPath = currentPath + "/" + nextName;
      let stat = fs.statSync(nextPath);
      if (stat.isDirectory()) {
        currentPath = nextPath;
        fs.readdir(currentPath, "utf-8", (err, files) => {
          if (err) {
            console.error(err);
            return;
          }
          showFiles(files);
        });
      } else {
        fs.readFile(nextPath, (err, data) => {
          if (err) {
            return;
          }
          let code = document.createElement("code");
          code.innerText = data.toString();
          body.innerHTML = "";
          body.appendChild(code);
        });
      }
    });
    p.textContent = file;
    body.appendChild(p);
  });
};

fs.readdir(__dirname, "utf-8", (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  showFiles(files);
});
