const fs = require('fs');
const path = require('path');
const  { runLoaders } = require('loader-runner');

runLoaders(
  {
    resource: "./files/demo.txt",
    loaders: [
      path.resolve(__dirname, "./loaders/async-loader")
    ],
    readResource: fs.readFile.bind(fs)
  },
  (err, result) => err
    ? console.error(err)
    : fs.writeFileSync("./output.txt", result.result)
);
