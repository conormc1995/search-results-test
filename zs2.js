let fs = require('fs').promises;


await fs.readFile('./result-history1.json', 'utf-8', function(err, data) {
        var parse_obj = JSON.parse(data);
        parse_obj['courseHistory'].push(["two"]);
        
        //writeToFile(parse_obj);
        let globalarray = Object.values(parse_obj);
        console.log()
        

        //console.log(nameValue);
        
        return globalarray;
    });

    //result = Object.values(result);
    console.log(result);




















  


