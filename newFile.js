//comments
//console.log("Mining block 1... ");
//doshaCoin.addBlock(new Block(1, "10/07/2021", { amount: 4 }));

//console.log("Mining block 2... ");
//doshaCoin.addBlock(new Block(2, "12/07/2021", { amount: 10 }));

//it will return true because we have not attempted to tamper with the blockchain
//console.log("Is blockchain valid? " + doshaCoin.isChainValid());

//after altering the amount it will return false on the console
//doshaCoin.chain[1].data = { amount: 100 };

//let's recomputate the hash to see whether it will return
//doshaCoin.chain[1].hash = doshaCoin.chain[1].calculateHash();
//console.log("Is blockchain valid? " + doshaCoin.isChainValid());

//console.log(JSON.stringify(doshaCoin, null, 4));
