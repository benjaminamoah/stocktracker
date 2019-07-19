//The Model in MVC
const dm = require("./dbmanager.js");

function generateIndex(base) {
    let change = Math.floor(Math.random() * 10);
    let positiveotnegative = Math.random() < 0.5 ? -1 : 1;
    let indexchange = Math.floor(base * (change/10000)) * positiveotnegative;
    return indexchange;
}

function retreiveaggregates(){
    return new Promise(function(resolve, reject){
        dm.getAggregates().then(function(data){
            if(data.length > 0){
                resolve(data); 
            }else{
                reject("Could not retreive data!");
            }   
        })
        .catch(function(error){
            console.log("Error message :"+error);
        });
    });
}

function aggregates(data){
    for(i = 0; i < data.length; i++){
        data[i].index = parseInt( data[i].index );
        data[i].change = parseInt( generateIndex( data[i].index ) );
        data[i].index += parseInt( data[i].change );
    }
    return data;
}

function yourstocks(){
    yourstocks = {};

    return yourstocks;
}

module.exports.generateIndex = generateIndex;
module.exports.yourstocks = yourstocks;
module.exports.retreiveaggregates = retreiveaggregates;
module.exports.aggregates = aggregates;