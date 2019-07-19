//mangodb query
const mongoclient = require('mongodb').MongoClient;

function getAggregates(){ 
    return new Promise((resolve, reject) => { 
    //mongoclient.connect('mongodb://localhost:27017/stocktracker',
    mongoclient.connect('mongodb+srv://<username>:<password>@cluster0-xqp9f.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    function(err, client){
        if(err) throw err;

        const db = client.db('stocktracker');

        db.collection('aggregates').find().toArray(
            function(err, result){
                if(err) reject(err)
                
                resolve(result);
            }
        )
    });

    
});
}

module.exports.getAggregates = getAggregates;
