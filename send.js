var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

numberOfFlags = 5;




async function doFirst(this1, callback){

    let that = this1 + 1
    callback(that);

}

async function sendEmail(numberOfFlags){
    let uncommonResult = numberOfFlags;
  
  
    var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
              throw err;
              callback(err);
          }
          else {

              callback(err, html, uncommonResult);
          }
      });
  };
  
  smtpTransport = nodemailer.createTransport(smtpTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'alisonscript@gmail.com',
          pass: 'alison123#'
      }
  }));
  
  readHTMLFile(__dirname + '/htmltemplate/index.htm', readHTMLFileCallback);
  
function readHTMLFileCallback(err, html, uncommonResult){
    let commonResult = 1100;
    let testResult = "passed";
      if (uncommonResult > 0){
    commonResult = commonResult - uncommonResult;
    testResult = "failed";

  }
  
          var template = handlebars.compile(html);
          var replacements = {
               result: testResult,
               uncommon: uncommonResult,
               common: commonResult
          };
          var htmlToSend = template(replacements);
          var mailOptions = {
              from: 'alisonscript@gmail.com',
              to : 'alisonscript@gmail.com',
              subject : 'Alison Search Testing',
              html : htmlToSend
           };
          smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                  console.log(error);
              }
          });
  
  }
  
  }


async function main(){

    let first = await doFirst(sendEmail());

}

main();
