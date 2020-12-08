let fs = require('fs');

let coursesCurrent = ['two'];

var courseHistory = '{"courseHistory":[]}';

var parse_obj = JSON.parse(Str_txt);
parse_obj['courseHistory'].push(["two"]);
Str_txt = JSON.stringify(parse_obj);
console.log(Str_txt);

parse_obj['courseHistory'].push(["one"]);
Str_txt = JSON.stringify(parse_obj);
console.log(Str_txt);







  


