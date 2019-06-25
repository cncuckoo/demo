const parts = require("./webpack.parts");

module.exports = config => {
  const tests = "tests/*.test.js";
  process.env.BABEL_ENV = "karma";

  config.set({
    frameworks: ["mocha"],
    files: [
      {
        pattern: tests,
      },
    ],
    preprocessors: {
      [tests]: ["webpack"],
    },
    webpack: Object.assign({}, {mode: 'production'}, parts.loadJavaScript()),
    singleRun: true,
    browsers: ["PhantomJS"],
    reporters: ["coverage"],
    coverageReporter: {
      dir: "build",
      reporters: [{ type: "html" }, { type: "lcov" }],
    },
  });
};
