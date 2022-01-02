import SHA256 from "crypto-js/sha256.js";

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2021", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  //validating the blockchain
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let doshaCoin = new Blockchain();
doshaCoin.addBlock(new Block(1, "10/07/2021", { amount: 4 }));
doshaCoin.addBlock(new Block(2, "12/07/2021", { amount: 10 }));

//it will return true because we have not attempted to tamper with the blockchain
//console.log("Is blockchain valid? " + doshaCoin.isChainValid());

//after altering the amount it will return false on the console
doshaCoin.chain[1].data = { amount: 100 };

//let's recomputate the hash to see whether it will return
doshaCoin.chain[1].hash = doshaCoin.chain[1].calculateHash();
console.log("Is blockchain valid? " + doshaCoin.isChainValid());

//console.log(JSON.stringify(doshaCoin, null, 4));
