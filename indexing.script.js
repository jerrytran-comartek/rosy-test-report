const fs = require("fs");

function index(dataFolder) {
  fs.readdir(dataFolder, (err, folders) => {
    if (err) {
      return;
    }

    folders.forEach((folder) => {
      try {
        index(folder);
        const absolutePath = `${dataFolder}/${folder}`;
        const temp = fs.readdirSync(absolutePath).map((report) => {
          return `<a href="/${report}/index.html">Test ${folder}</a>\n`;
        });
        const indexFile = `${absolutePath}/index.html`;
        const content = `<!DOCTYPE html>
          <html dir="ltr">
          <head>
              <meta charset="utf-8">
              <title>Allure Report</title>
          </head>
          <body>
              ${temp.join("")}
          </body>`;
        fs.writeFile(indexFile, content, (err) => {
          console.log(err);
        });
      } catch (error) {}
    });
  });
}

const data = `${__dirname}`;
index(data);
