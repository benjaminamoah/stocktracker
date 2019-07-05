const express = require("express");
//import axios from 'axios';
const cors = require('cors');


const port = 5000;
const app = express();

app.use(cors());

const http = require("http");

//http.createServer((req, res) => {
app.use((req, res, next) => {
    console.log("Request url: "+req.url);

    if(req.url.toLowerCase() === "/events"){
        res.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-control": "no-cache",
            "Access-Control-Allow-Origin": "*"
        });

        generateIndex = (base) => {
            let change = Math.floor(Math.random() * 10);
            let positiveotnegative = Math.random() < 0.5 ? -1 : 1;
            let indexchange = Math.floor(base * (change/10000)) * positiveotnegative;
            return indexchange;
        }
        
        let nasdaq = 8100;
        let snp = 3000;
        let nyse  = 13150;
        let nasdaq100 = 7800;
        let dow = 26800;

        res.write('data: [{"id": "1", "aggregate": "NASDAQ Composite", "index": "'+nasdaq+'", "change": ""}, \
            {"id": "2", "aggregate": "S&P 500", "index": "'+snp+'", "change": ""}, \
            {"id": "3", "aggregate": "NYSE Composite", "index": "'+nyse+'", "change": ""}, \
            {"id": "4", "aggregate": "NASDAQ 100", "index": "'+nasdaq100+'", "change": ""}, \
            {"id": "5", "aggregate": "DOW JONES", "index": "'+dow+'", "change": ""}]');
        res.write("\n\n");

        setInterval(() => {
            //stuff happens to indices
            let nasdaqchange = generateIndex(8100);
            nasdaq += nasdaqchange;
            let snpchange = generateIndex(3000);
            snp += snpchange;
            let nysechange  = generateIndex(13150);
            nyse  += nysechange;
            let nasdaq100change = generateIndex(7800);
            nasdaq100 += nasdaq100change;
            let dowchange = generateIndex(26800);
            dow += dowchange;

            res.write('data: [{"id": "1", "aggregate": "Nasdaq Composite", "index": "'+nasdaq+'", "change": "'+nasdaqchange+'"}, \
            {"id": "2", "aggregate": "S&P 500", "index": "'+snp+'", "change": "'+snpchange+'"}, \
            {"id": "3", "aggregate": "NYSE Composite", "index": "'+nyse+'", "change": "'+nysechange+'"}, \
            {"id": "4", "aggregate": "Nasdaq 100", "index": "'+nasdaq100+'", "change": "'+nasdaq100change+'"}, \
            {"id": "5", "aggregate": "Dow Jones Industrial Average", "index": "'+dow+'", "change": "'+dowchange+'"}]');
            res.write("\n\n");
        }, 4000);

    }else{
        res.writeHead(404);
        res.end();
    }
})
.listen(port, () => console.log("You are connected at port ${port}"));


/*app.use(function(req, res, next) {
    console.log("Request url: "+req.url);

    if(req.url.toLowerCase() === "/events"){
        res.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-control": "no-cache"
        });

        setTimeout(() => {
            res.write("data: {'aggregate': 'NASDAQ', 'state': '1545'}");
            res.write("\n\n");
        }, 2000);

        setTimeout(() => {
            res.write("data: {'aggregate': 'DOW JONES', 'state': '26,788'}");
            res.write("\n\n");
        }, 2000);
    }else{
        res.writeHead(404);
        res.end();
    }
});

app.listen(port, () => console.log("You are connected at port ${port}"));
*/