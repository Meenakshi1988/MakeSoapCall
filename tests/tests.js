const expect = require('chai').expect;
const request = require('request');
const fs = require('fs');
let inputFile = './data.xml';
let rawData;
let expectedStatusCode = 404;
let expectedSuccessString = 404;
let headerOptions = { "Content-Type": "application/soap+xml; charset=utf-8", "Content-Length": 999 };
const httpOptions = {
    url: 'http://www.example.org/InStock%20HTTP/1.1',
    body: rawData,
    headers: headerOptions,
    json: true
  }

describe('Unit tests for making SOAP call', function () {
    // verify sample request existence
    it('Check for existence of sample request', function (){
        expect(fs.existsSync(inputFile)).to.be.true;
    });
    // Validate the response code
    it('Validate the response code', function(){
        request.post(httpOptions, function(err, res, body){
            expect(res.statusCode).to.equal(404);
        });
    });
});