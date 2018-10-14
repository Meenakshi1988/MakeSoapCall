const http = require('http');
const fs = require('fs');
const request = require('request');
const expect = require('chai').expect;
let rawData;
let expectedStatusCode = 404;
let expectedSuccessString = 404;
let headerOptions = { "Content-Type": "application/soap+xml; charset=utf-8", "Content-Length": 999 };
// Reading soap request from xml 
if (fs.existsSync('./data.xml')) {
  fs.readFile('./data.xml', 'utf8', function (err, data) {
    console.log('Successfully read the request from data.xml file');
    rawData = data;
    console.log(rawData);
  })
} else {
  console.log('Error: Ensure that the file you are trying to read exists');
}

const httpOptions = {
  url: 'http://www.example.org/InStock%20HTTP/1.1',
  body: rawData,
  headers: headerOptions,
  json: true
}

request.post(httpOptions, function (error, response, body) {
  if (error) {
    console.log('Error: ' + error);
  } else {
    // Capture status code from response
    let actualResponseCode = response.statusCode;
    // Capture code from error node in body
    let content = JSON.parse(JSON.stringify(body));
    let actualErrorString = content.errors[0].code;
    console.log('Status Code: ' + actualResponseCode);
    // Assert status code
    expect(actualResponseCode).to.equal(expectedStatusCode, "Error: Expected response code: " + expectedStatusCode +
      "and actual response code: " + actualResponseCode + " didn't match");
    console.log('Error node attribute of body: ' + actualErrorString);
    // Assert code from error node in body
    expect(actualErrorString).to.equal(expectedSuccessString, "Error: Expected error node object: " + expectedSuccessString +
      "and actual error node object: " + actualErrorString + " didn't match");
  }
});