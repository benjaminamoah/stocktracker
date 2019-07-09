
    function generateIndex(base) {
        let change = Math.floor(Math.random() * 10);
        let positiveotnegative = Math.random() < 0.5 ? -1 : 1;
        let indexchange = Math.floor(base * (change/10000)) * positiveotnegative;
        return indexchange;
    }

    function aggregates(){
        aggregate = {};

        return aggregate;
    }

    function yourstocks(){
        yourstocks = {};

        return yourstocks;
    }

    module.exports.generateIndex = generateIndex;
    module.exports.yourstocks = yourstocks;
    module.exports.aggregates = aggregates;