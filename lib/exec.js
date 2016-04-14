'use strict';

const ChildProcess = require('child_process');

// A thunkified exec that attaches stderr to the error
// if one occurs.
const exec = function exec () {
  let args, arg;

  args = [];
  for (arg of arguments) {
    args.push(arg);
  }

  return new Promise(function (resolve, reject) {

    // Since stderr is important if an error happens, we'll attach it
    // to the error.
    let callback = function (error, stdout, stderr) {
      if (error) {
        error.stderr = stderr;
        return reject(error);
      }

      return resolve(stdout);
    };

    args.push(callback);

    ChildProcess.exec.apply(ChildProcess, args);
  });
};

module.exports = exec;
