const sc = require("./stockchanges.js");
const express = require("express");
//import axios from 'axios';
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log("Request url: "+req.url);

    if(req.url.toLowerCase() === "/events"){
        res.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-control": "no-cache",
            "Access-Control-Allow-Origin": "*"
        });

        sc.retreiveaggregates().then(function(data){ 
            let new_data = data;
            setInterval(() => {
                new_data = sc.aggregates(new_data);
                res.write("data: "+JSON.stringify(new_data));
                res.write("\n\n");
            }, 4000);
        }).catch(function(error){
            console.log("Houston, :"+error);
        });

    }else{
        res.writeHead(404);
        res.end();
    }
})
.listen(PORT, () => console.log("You are connected at port" + PORT));