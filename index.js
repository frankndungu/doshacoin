import SHA256 from "crypto-js/sha256.js";

class Transactions {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
  //proof of work concept
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("01/01/2021", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined! ");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transactions(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransactions(transactions) {
    this.pendingTransactions.push(transactions);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
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
doshaCoin.createTransactions(new Transactions("address1", "address2", 100));
doshaCoin.createTransactions(new Transactions("address2", "address1", 50));

console.log("\n Starting the miner ");
doshaCoin.minePendingTransactions("franks-address");

console.log(
  "\nBalance of frank is ",
  doshaCoin.getBalanceOfAddress("franks-address")
);

console.log("\n Starting the miner again ...");
doshaCoin.minePendingTransactions("franks-address");

console.log(
  "\nBalance of frank is ",
  doshaCoin.getBalanceOfAddress("franks-address")
);
