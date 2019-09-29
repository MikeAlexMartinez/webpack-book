const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
  {
    resource: "./files/demo.txt",
    loaders: [
      {
        loader: path.resolve(__dirname, "./loaders/demo-file-loader.js"),
        options: {
          name: "demo.[ext]",
          text: 'test'
        },
      },
      {
        loader: path.resolve(__dirname, "./loaders/pitch-loader"),
        options: {
          text: 'optional-pitch-text'
        }
      }
    ],
    context: {
      emitFile: () => {}
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => (err ? console.error(err) : console.log(result))
)