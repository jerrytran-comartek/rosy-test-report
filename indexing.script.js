const fs = require("fs");

function index(folder) {
  try {
    const temp = fs.readdirSync(folder).map((report) => {
      const path = `${folder}/${report}`;
      if (!fs.lstatSync(path).isDirectory()) {
        return;
      }
      return `<div><a href="./${report}/index.html">Test ${report}</a></div>\n`;
    });
    const indexFile = `${folder}/index.html`;
    const content = `<!DOCTYPE html>
        <html dir="ltr">
        <head>
            <meta charset="utf-8">
            <title>Allure Report</title>
        </head>
        <body>
            ${temp.join("")}
        </body>`;
    fs.writeFileSync(indexFile, content);
  } catch (error) {}
}
const dir = `${__dirname}/data`;
index(dir);
fs.readdirSync(dir).forEach((name) => {
  const folder = `${dir}/${name}`;
  index(folder);
});
