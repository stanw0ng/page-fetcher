const request = require('request');
const fs = require('fs');

const url = process.argv[2]; // get URL from command line argument
const filePath = process.argv[3]; // get file path from command line argument

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Invalid status code: ${response.statusCode}`);
    return;
  }

  fs.writeFile(filePath, body, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.stat(filePath, (err, stats) => { //nest stat in writeFile so it executes after the file is written
      if (err) {
        console.error(err);
        return;
      }

      console.log(`File saved to ${filePath} (${stats.size} bytes)`);
    });
  });
});