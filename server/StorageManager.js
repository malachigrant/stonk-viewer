const fs = require('fs');

const loadFile = (filePath, cb) => {
  fs.readFile(`${__dirname}${filePath}`, (err, data) => {
    if (err) {
      cb({});
      return;
    }
    const jsonData = JSON.parse(data);
    cb(jsonData);
  });
};

const loadList = (fileName, cb) => {
  loadFile(`/lists/${fileName.toLowerCase()}.json`, cb);
};

const loadDashboard = (fileName, cb) => {
  loadFile(`/dashboards/${fileName.toLowerCase()}.json`, cb);
};

module.exports = {
  loadList,
  loadDashboard,
};
