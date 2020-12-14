var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');


let testResult = "failed";
let uncommonResult = 10;
let commonResult = 990;

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            readHTMLFileCallback(err, html);
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

readHTMLFile(__dirname + '/htmltemplate/index.htm');

function readHTMLFileCallback(err, html){

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