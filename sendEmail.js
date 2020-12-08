var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "gmail",
    secure: mailConfig.secure,
    port: mailConfig.port,
    auth: {
        user: 'conormcloughlin64@gmail.com',
        pass: 'galway13'
    }
}));

readHTMLFile(__dirname + '/htmltemplate/index.htm', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         result: "failed",
         uncommon: "10",
         common: "990"
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: 'cmcloughlin@alison.com',
        to : 'cmcloughlin@alison.com',
        subject : 'Alison Search Testing',
        html : htmlToSend
     };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        }
    });
});