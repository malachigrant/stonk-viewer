const fs = require('fs');

const loadFile = (filePath, cb) => {
  fs.readFile(`${__dirname}${filePath}`, (err, data) => {
    if (err) {
      console.log(err);
      cb({});
      return;
    }
    const jsonData = JSON.parse(data);
    cb(jsonData);
  });
};

const saveFile = (filePath, data, cb) => {
  fs.writeFile(`${__dirname}${filePath}`, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
      cb(err);
      return;
    }
    cb();
  });
};

const loadList = (fileName, cb) => {
  loadFile(`/lists/${fileName.toLowerCase()}.json`, cb);
};

const loadDashboard = (fileName, cb) => {
  loadFile(`/dashboards/${fileName.toLowerCase()}.json`, cb);
};

const createDashboard = (fileName, data, cb) => {
  saveFile(`/dashboards/${fileName.toLowerCase()}.json`, data, cb);
};

const readDashboard = (fileName, cb) => {
  loadFile(`/dashboards/${fileName.toLowerCase()}.json`, cb);
};

module.exports = {
  loadList,
  loadDashboard,
  createDashboard,
  readDashboard,
};
