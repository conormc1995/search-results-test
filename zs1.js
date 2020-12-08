let fs = require('fs').promises;


async function jazz(){


    let result = await fs.readFile('./result-history1.json', 'utf-8', function(err, data) {


    });

    
    

    function writeToFile(coursesComplete){
  
        fs.writeFile("./result-history1.json", JSON.stringify(coursesComplete), function(err) {
          if(err) {
                console.log(err);
          } 
          else {
            console.log("Output");
          }
        }); 
      
      }

    
    result = JSON.parse(result);
    result['courseHistory'].push(["two"]);
    writeToFile(result);


    result = Object.values(result);
    result = result[0][0];
    console.log(result[0][0]);


}

jazz();

















  


